import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { ResolvedTheme } from "../../lib/theme-context";
import type { VisualQuality } from "../../hooks/useDeviceProfile";

/**
 * Decorative 3D network globe (plain Three.js — no React Three Fiber needed for
 * a single self-contained scene). It is NOT a live threat map: node positions
 * are fixed reference cities and arcs are purely illustrative.
 *
 * Performance: one renderer, ~10 draw calls, DPR capped, rendering pauses when
 * the canvas is off-screen or the tab is hidden, and a reduced scene on
 * low-power devices. Reduced-motion users get a single static frame.
 */

export interface GlobeNodeInfo {
  name: string;
  home: boolean;
  x: number;
  y: number;
}

interface Props {
  theme: ResolvedTheme;
  quality: Exclude<VisualQuality, "fallback">;
  reducedMotion: boolean;
  onHover?: (info: GlobeNodeInfo | null) => void;
  onFailure?: () => void;
}

const R = 1.5;

const CITIES: { name: string; lat: number; lon: number; home?: boolean }[] = [
  { name: "Pune", lat: 18.52, lon: 73.86, home: true },
  { name: "Mumbai", lat: 19.08, lon: 72.88 },
  { name: "Bengaluru", lat: 12.97, lon: 77.59 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Reykjavík", lat: 64.15, lon: -21.94 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "San Francisco", lat: 37.77, lon: -122.42 },
  { name: "São Paulo", lat: -23.55, lon: -46.63 },
  { name: "Nairobi", lat: -1.29, lon: 36.82 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Seoul", lat: 37.57, lon: 126.98 },
];

const LINKS: [string, string][] = [
  ["Pune", "Singapore"],
  ["Pune", "Frankfurt"],
  ["Pune", "Dubai"],
  ["Pune", "Tokyo"],
  ["Pune", "Nairobi"],
  ["Pune", "Bengaluru"],
  ["Mumbai", "London"],
  ["Singapore", "Sydney"],
  ["Tokyo", "San Francisco"],
  ["Seoul", "Singapore"],
  ["London", "New York"],
  ["Frankfurt", "Reykjavík"],
  ["New York", "São Paulo"],
  ["Cape Town", "São Paulo"],
  ["Dubai", "Cape Town"],
  ["San Francisco", "New York"],
];

const PALETTE = {
  dark: { accent: "#00d4ff", orange: "#ff8a3d", green: "#38e58b", fill: "#08111d", grid: 0.16, dots: 0.55, additive: true },
  light: { accent: "#007eaa", orange: "#d96821", green: "#168a55", fill: "#eef3f9", grid: 0.22, dots: 0.6, additive: false },
} as const;

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function makeDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function NetworkGlobe({ theme, quality, reducedMotion, onHover, onFailure }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);
  const applyThemeRef = useRef<((t: ResolvedTheme) => void) | null>(null);
  const hoverRef = useRef(onHover);
  useEffect(() => {
    hoverRef.current = onHover;
  }, [onHover]);

  useEffect(() => {
    themeRef.current = theme;
    applyThemeRef.current?.(theme);
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const high = quality === "high";
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: high, alpha: true, powerPreference: high ? "high-performance" : "low-power" });
    } catch {
      onFailure?.();
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, high ? 1.75 : 1.25);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.touchAction = "pan-y";
    canvas.setAttribute("aria-hidden", "true");
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 7.9);

    const root = new THREE.Group(); // receives drag + parallax
    const globe = new THREE.Group(); // auto-rotates
    root.rotation.set(0.32, 0, -0.18);
    root.add(globe);
    scene.add(root);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => (disposables.push(o), o);
    const dotTex = track(makeDotTexture());

    // --- Solid inner sphere (occludes the far side) --------------------------
    const fillMat = track(new THREE.MeshBasicMaterial({ color: PALETTE.dark.fill, transparent: true, opacity: 0.94 }));
    const fill = new THREE.Mesh(track(new THREE.SphereGeometry(R * 0.995, 64, 48)), fillMat);
    fill.renderOrder = 0;
    globe.add(fill);

    // --- Lat / long wireframe -----------------------------------------------
    const gridPts: number[] = [];
    const seg = 96;
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let i = 0; i < seg; i++) {
        const a = latLonToVec3(lat, (i / seg) * 360, R);
        const b = latLonToVec3(lat, ((i + 1) / seg) * 360, R);
        gridPts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    for (let lon = 0; lon < 360; lon += 15) {
      for (let i = 0; i < seg / 2; i++) {
        const a = latLonToVec3(-90 + (i / (seg / 2)) * 180, lon, R);
        const b = latLonToVec3(-90 + ((i + 1) / (seg / 2)) * 180, lon, R);
        gridPts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const gridGeo = track(new THREE.BufferGeometry());
    gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPts, 3));
    const gridMat = track(new THREE.LineBasicMaterial({ color: PALETTE.dark.accent, transparent: true, opacity: 0.16, depthWrite: false }));
    globe.add(new THREE.LineSegments(gridGeo, gridMat));

    // --- Surface dot matrix (fibonacci sphere) -------------------------------
    const dotCount = high ? 2200 : 900;
    const dotPos = new Float32Array(dotCount * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      dotPos.set([Math.cos(t) * r * R * 1.003, y * R * 1.003, Math.sin(t) * r * R * 1.003], i * 3);
    }
    const dotGeo = track(new THREE.BufferGeometry());
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    const dotMat = track(
      new THREE.PointsMaterial({ color: PALETTE.dark.accent, size: 0.07, map: dotTex, transparent: true, opacity: 0.55, depthWrite: false, sizeAttenuation: true })
    );
    globe.add(new THREE.Points(dotGeo, dotMat));

    // --- Atmosphere (fresnel rim with cyan + orange lighting) ----------------
    const atmoMat = track(
      new THREE.ShaderMaterial({
        uniforms: {
          uCyan: { value: new THREE.Color(PALETTE.dark.accent) },
          uOrange: { value: new THREE.Color(PALETTE.dark.orange) },
          uIntensity: { value: 1.0 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal; varying vec3 vView;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uCyan; uniform vec3 uOrange; uniform float uIntensity;
          varying vec3 vNormal; varying vec3 vView;
          void main(){
            float rim = pow(1.0 - abs(dot(vNormal, vView)), 3.0);
            float side = smoothstep(-0.6, 0.9, dot(vNormal, normalize(vec3(-0.8, -0.3, 0.4))));
            vec3 col = mix(uCyan, uOrange, side * 0.55);
            gl_FragColor = vec4(col, rim * 0.85 * uIntensity);
          }`,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      })
    );
    const atmo = new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.14, 64, 48)), atmoMat);
    root.add(atmo);

    // --- Nodes ---------------------------------------------------------------
    const nodePos = new Float32Array(CITIES.length * 3);
    const nodeColor = new Float32Array(CITIES.length * 3);
    const nodeSize = new Float32Array(CITIES.length);
    const nodeIdx = new Float32Array(CITIES.length);
    const cityVec = new Map<string, THREE.Vector3>();
    CITIES.forEach((c, i) => {
      const v = latLonToVec3(c.lat, c.lon, R * 1.01);
      cityVec.set(c.name, v);
      nodePos.set([v.x, v.y, v.z], i * 3);
      nodeSize[i] = c.home ? 19 : 12;
      nodeIdx[i] = i;
    });
    const nodeGeo = track(new THREE.BufferGeometry());
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute("aColor", new THREE.BufferAttribute(nodeColor, 3));
    nodeGeo.setAttribute("aSize", new THREE.BufferAttribute(nodeSize, 1));
    nodeGeo.setAttribute("aIdx", new THREE.BufferAttribute(nodeIdx, 1));
    const nodeMat = track(
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPixelRatio: { value: dpr }, uHover: { value: -1 } },
        vertexShader: /* glsl */ `
          attribute vec3 aColor; attribute float aSize; attribute float aIdx;
          uniform float uTime; uniform float uPixelRatio; uniform float uHover;
          varying vec3 vColor;
          void main(){
            vColor = aColor;
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            float pulse = 1.0 + 0.18 * sin(uTime * 2.2 + aIdx * 1.7);
            float hover = abs(aIdx - uHover) < 0.5 ? 1.9 : 1.0;
            gl_PointSize = aSize * pulse * hover * uPixelRatio * (7.6 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float core = smoothstep(0.22, 0.0, d);
            float halo = smoothstep(0.5, 0.15, d) * 0.45;
            gl_FragColor = vec4(mix(vColor, vec3(1.0), core * 0.55), core + halo);
          }`,
        transparent: true,
        depthWrite: false,
      })
    );
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    nodes.renderOrder = 3;
    globe.add(nodes);

    // Pulse ring around the home node
    const home = CITIES.find((c) => c.home)!;
    const homeVec = cityVec.get(home.name)!;
    const pulseMat = track(new THREE.MeshBasicMaterial({ color: PALETTE.dark.orange, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }));
    const pulse = new THREE.Mesh(track(new THREE.RingGeometry(0.05, 0.062, 48)), pulseMat);
    pulse.position.copy(homeVec.clone().multiplyScalar(1.002));
    pulse.lookAt(homeVec.clone().multiplyScalar(2));
    globe.add(pulse);

    // --- Arcs (single LineSegments draw call, animated in the shader) --------
    const arcPos: number[] = [];
    const arcT: number[] = [];
    const arcSeed: number[] = [];
    const arcHome: number[] = [];
    const steps = high ? 64 : 40;
    LINKS.forEach(([a, b], li) => {
      const va = cityVec.get(a)!;
      const vb = cityVec.get(b)!;
      const dist = va.distanceTo(vb);
      const mid = va.clone().add(vb).normalize().multiplyScalar(R * (1.02 + dist * 0.18));
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      const pts = curve.getPoints(steps);
      const fromHome = a === home.name ? 1 : 0;
      for (let i = 0; i < steps; i++) {
        arcPos.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
        arcT.push(i / steps, (i + 1) / steps);
        arcSeed.push(li * 0.137, li * 0.137);
        arcHome.push(fromHome, fromHome);
      }
    });
    const arcGeo = track(new THREE.BufferGeometry());
    arcGeo.setAttribute("position", new THREE.Float32BufferAttribute(arcPos, 3));
    arcGeo.setAttribute("aT", new THREE.Float32BufferAttribute(arcT, 1));
    arcGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(arcSeed, 1));
    arcGeo.setAttribute("aHome", new THREE.Float32BufferAttribute(arcHome, 1));
    const arcMat = track(
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uCyan: { value: new THREE.Color(PALETTE.dark.accent) },
          uOrange: { value: new THREE.Color(PALETTE.dark.orange) },
          uBase: { value: 0.34 },
        },
        vertexShader: /* glsl */ `
          attribute float aT; attribute float aSeed; attribute float aHome;
          varying float vT; varying float vSeed; varying float vHome;
          void main(){ vT = aT; vSeed = aSeed; vHome = aHome; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform vec3 uCyan; uniform vec3 uOrange; uniform float uBase;
          varying float vT; varying float vSeed; varying float vHome;
          void main(){
            float head = fract(uTime * 0.22 + vSeed);
            float d = head - vT;
            float trail = d > 0.0 && d < 0.28 ? 1.0 - d / 0.28 : 0.0;
            float edge = smoothstep(0.0, 0.06, vT) * smoothstep(1.0, 0.94, vT);
            vec3 col = mix(uCyan, uOrange, vHome * 0.75);
            gl_FragColor = vec4(col, (uBase + trail * 0.95) * edge);
          }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    const arcs = new THREE.LineSegments(arcGeo, arcMat);
    arcs.renderOrder = 2;
    globe.add(arcs);

    // --- Scanning rings ------------------------------------------------------
    const rings = new THREE.Group();
    root.add(rings);
    const ringMat = track(new THREE.MeshBasicMaterial({ color: PALETTE.dark.accent, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false }));
    const ringA = new THREE.Mesh(track(new THREE.RingGeometry(R * 1.26, R * 1.265, 160)), ringMat);
    ringA.rotation.x = Math.PI / 2;
    rings.add(ringA);

    const sweepMat = track(
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(PALETTE.dark.accent) }, uOpacity: { value: 0.9 } },
        vertexShader: /* glsl */ `varying vec2 vPos; void main(){ vPos = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform vec3 uColor; uniform float uOpacity; varying vec2 vPos;
          void main(){
            float a = atan(vPos.y, vPos.x);
            float s = fract((a / 6.28318) + uTime * 0.08);
            float beam = pow(s, 6.0);
            gl_FragColor = vec4(uColor, beam * uOpacity);
          }`,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      })
    );
    const sweep = new THREE.Mesh(track(new THREE.RingGeometry(R * 1.3, R * 1.42, 160, 1)), sweepMat);
    sweep.rotation.x = Math.PI / 2;
    rings.add(sweep);

    const tickPts: number[] = [];
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2;
      const r1 = R * 1.44;
      const r2 = R * (i % 10 === 0 ? 1.49 : 1.46);
      tickPts.push(Math.cos(a) * r1, 0, Math.sin(a) * r1, Math.cos(a) * r2, 0, Math.sin(a) * r2);
    }
    const tickGeo = track(new THREE.BufferGeometry());
    tickGeo.setAttribute("position", new THREE.Float32BufferAttribute(tickPts, 3));
    const tickMat = track(new THREE.LineBasicMaterial({ color: PALETTE.dark.accent, transparent: true, opacity: 0.3, depthWrite: false }));
    rings.add(new THREE.LineSegments(tickGeo, tickMat));

    const ringB = new THREE.Mesh(track(new THREE.RingGeometry(R * 1.18, R * 1.184, 160)), track(ringMat.clone()));
    (ringB.material as THREE.MeshBasicMaterial).color.set(PALETTE.dark.orange);
    (ringB.material as THREE.MeshBasicMaterial).opacity = 0.25;
    ringB.rotation.set(Math.PI / 2.6, 0.5, 0);
    root.add(ringB);

    // --- Floating particles --------------------------------------------------
    const pCount = high ? 520 : 160;
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(R * (1.3 + Math.random() * 1.1));
      pPos.set([v.x, v.y, v.z], i * 3);
    }
    const pGeo = track(new THREE.BufferGeometry());
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    const pMat = track(
      new THREE.PointsMaterial({ size: 0.085, map: dotTex, vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false, sizeAttenuation: true })
    );
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // --- Theme application ---------------------------------------------------
    const applyTheme = (t: ResolvedTheme) => {
      const p = PALETTE[t];
      const blend = p.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
      fillMat.color.set(p.fill);
      fillMat.opacity = t === "dark" ? 0.94 : 0.9;
      gridMat.color.set(p.accent);
      gridMat.opacity = p.grid;
      dotMat.color.set(p.accent);
      dotMat.opacity = p.dots;
      atmoMat.uniforms.uCyan.value.set(p.accent);
      atmoMat.uniforms.uOrange.value.set(p.orange);
      atmoMat.uniforms.uIntensity.value = t === "dark" ? 1 : 0.3;
      atmoMat.blending = blend;
      arcMat.uniforms.uCyan.value.set(p.accent);
      arcMat.uniforms.uOrange.value.set(p.orange);
      arcMat.uniforms.uBase.value = t === "dark" ? 0.34 : 0.45;
      arcMat.blending = blend;
      sweepMat.uniforms.uColor.value.set(p.accent);
      sweepMat.uniforms.uOpacity.value = t === "dark" ? 0.9 : 0.55;
      sweepMat.blending = blend;
      ringMat.color.set(p.accent);
      tickMat.color.set(p.accent);
      (ringB.material as THREE.MeshBasicMaterial).color.set(p.orange);
      (ringB.material as THREE.MeshBasicMaterial).opacity = 0.25;
      ringB.visible = t === "dark";
      pulseMat.color.set(p.orange);
      const cyan = new THREE.Color(p.accent);
      const orange = new THREE.Color(p.orange);
      const green = new THREE.Color(p.green);
      CITIES.forEach((c, i) => {
        const col = c.home ? orange : i % 5 === 0 ? green : cyan;
        nodeColor.set([col.r, col.g, col.b], i * 3);
      });
      (nodeGeo.getAttribute("aColor") as THREE.BufferAttribute).needsUpdate = true;
      for (let i = 0; i < pCount; i++) {
        const col = i % 9 === 0 ? orange : cyan;
        pCol.set([col.r, col.g, col.b], i * 3);
      }
      (pGeo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
      pMat.opacity = t === "dark" ? 0.7 : 0.55;
      pMat.blending = blend;
      [atmoMat, arcMat, sweepMat, pMat].forEach((m) => (m.needsUpdate = true));
      requestRender();
    };

    // --- Interaction ---------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points = { threshold: 0.09 };
    const pointer = new THREE.Vector2(2, 2);
    const target = { x: 0, y: 0 }; // parallax target
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velY = 0;
    let velX = 0;
    let hovered = -1;
    let hovering = false;

    const updateHover = () => {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(nodes);
      let idx = -1;
      for (const h of hits) {
        const world = h.point.clone();
        const toCam = camera.position.clone().sub(world).normalize();
        if (world.clone().normalize().dot(toCam) > 0.1 && h.index !== undefined) {
          idx = h.index;
          break;
        }
      }
      if (idx !== hovered) {
        hovered = idx;
        nodeMat.uniforms.uHover.value = idx;
        canvas.style.cursor = idx >= 0 ? "pointer" : dragging ? "grabbing" : "grab";
        if (idx < 0) hoverRef.current?.(null);
      }
      if (idx >= 0) {
        const p = new THREE.Vector3().fromArray(nodePos, idx * 3).applyMatrix4(nodes.matrixWorld).project(camera);
        const rect = canvas.getBoundingClientRect();
        hoverRef.current?.({
          name: CITIES[idx].name,
          home: Boolean(CITIES[idx].home),
          x: ((p.x + 1) / 2) * rect.width,
          y: ((1 - p.y) / 2) * rect.height,
        });
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      target.x = pointer.y * 0.12;
      target.y = pointer.x * 0.2;
      if (dragging) {
        velY = (e.clientX - lastX) * 0.005;
        velX = (e.clientY - lastY) * 0.003;
        globe.rotation.y += velY;
        root.rotation.x = THREE.MathUtils.clamp(root.rotation.x + velX, -0.4, 0.9);
        lastX = e.clientX;
        lastY = e.clientY;
      }
      updateHover();
      requestRender();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        onPointerMove(e); // tap reveals node labels on touch
        return;
      }
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = hovered >= 0 ? "pointer" : "grab";
    };
    const onEnter = () => (hovering = true);
    const onLeave = () => {
      hovering = false;
      target.x = target.y = 0;
      pointer.set(2, 2);
      hovered = -1;
      nodeMat.uniforms.uHover.value = -1;
      hoverRef.current?.(null);
    };
    canvas.style.cursor = "grab";
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      onFailure?.();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    // --- Sizing --------------------------------------------------------------
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      requestRender();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- Loop ----------------------------------------------------------------
    const clock = new THREE.Clock();
    let elapsed = 0;
    let raf = 0;
    let visible = true;
    let needsRender = true;
    const animate = !reducedMotion;

    function requestRender() {
      needsRender = true;
      if (!animate && !raf) raf = requestAnimationFrame(frame);
    }

    function frame() {
      raf = 0;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (animate) {
        elapsed += dt;
        if (!dragging) {
          globe.rotation.y += dt * (hovering ? 0.03 : 0.07) + velY;
          velY *= 0.92;
          velX *= 0.9;
          root.rotation.x += (0.32 + target.x - root.rotation.x) * 0.04;
          root.rotation.y += (target.y - root.rotation.y) * 0.04;
        }
        rings.rotation.y += dt * 0.12;
        ringB.rotation.z += dt * 0.05;
        particles.rotation.y -= dt * 0.015;
        const s = 1 + ((elapsed * 0.6) % 1) * 2.4;
        pulse.scale.setScalar(s);
        pulseMat.opacity = 0.85 * (1 - ((elapsed * 0.6) % 1));
        nodeMat.uniforms.uTime.value = elapsed;
        arcMat.uniforms.uTime.value = elapsed;
        sweepMat.uniforms.uTime.value = elapsed;
        if (hovered >= 0) updateHover();
        renderer.render(scene, camera);
        if (visible) raf = requestAnimationFrame(frame);
      } else if (needsRender) {
        // Static frame: show trails mid-flight so arcs are visible.
        arcMat.uniforms.uTime.value = 1.7;
        sweepMat.uniforms.uTime.value = 0.4;
        pulse.scale.setScalar(1.8);
        pulseMat.opacity = 0.5;
        renderer.render(scene, camera);
        needsRender = false;
      }
    }

    const start = () => {
      if (!raf) {
        clock.getDelta();
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === "visible";
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    io.observe(mount);
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    applyThemeRef.current = applyTheme;
    applyTheme(themeRef.current);
    resize();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      applyThemeRef.current = null;
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      canvas.remove();
    };
    // Scene is rebuilt only when quality or motion preference changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality, reducedMotion]);

  return <div ref={mountRef} className="absolute -inset-[12%]" />;
}
