# 🏎️ Paulson Fernandes | Portfolio

A modern, interactive developer portfolio combining **Cybersecurity, Software Engineering, Artificial Intelligence, and Cloud Security** with a visual experience inspired by motorsport engineering, telemetry, precision, and speed.

The portfolio is designed to feel like an engineering command centre rather than a traditional portfolio, using telemetry-inspired interfaces, technical layouts, animations, and interactive elements to showcase my projects, experience, skills, and certifications.

> **Note:** The motorsport-inspired visuals in this project are original. This portfolio does not use official Formula 1 branding, team logos, liveries, or copyrighted motorsport assets.

---

## ✨ Features

* 🏁 Motorsport-inspired engineering interface
* 🚦 Animated starting-light introduction
* 📊 Telemetry-inspired visual elements
* 🛡️ Cybersecurity-focused project showcase
* 💻 Interactive project filtering
* 🏆 Certifications showcase
* 🧠 Skills and technology dashboard
* 🕒 Experience timeline
* 📱 Fully responsive layout
* ✨ Smooth animations and transitions
* ⌨️ Keyboard-accessible navigation
* ♿ Reduced-motion accessibility support
* 📡 Integrated contact form
* 🏎️ Hidden DRS easter egg

---

## 🛠️ Tech Stack

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| **React 19**        | Component-based frontend                 |
| **TypeScript**      | Type-safe development                    |
| **Vite**            | Development and production build tooling |
| **Tailwind CSS v4** | Styling and responsive design            |
| **Framer Motion**   | Animations and transitions               |
| **Lucide React**    | Interface icons                          |

---

## 📁 Project Structure

```text
Portfolio/
│
├── public/
│
├── src/
│   ├── components/
│   ├── data/
│   │   ├── personal.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   ├── systems.ts
│   │   └── navigation.ts
│   │
│   └── main.tsx
│
├── .env.example
├── index.html
├── package.json
└── README.md
```

Portfolio content is separated from the UI through files inside `src/data/`, making projects, skills, experience, certifications, and personal information easier to maintain.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

Check your installation:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/ScriptSynapse/Portfolio.git
```

Navigate into the project:

```bash
cd Portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed by Vite in your browser.

---

## 📦 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The production files will be generated inside:

```text
dist/
```

---

## ⚙️ Customising the Portfolio

Most portfolio information can be changed without modifying the main UI components.

Content is stored inside:

```text
src/data/
```

| File            | Controls                                                |
| --------------- | ------------------------------------------------------- |
| `personal.ts`   | Profile, bio, education, links and headline information |
| `projects.ts`   | Projects, technologies, filters and project links       |
| `experience.ts` | Experience timeline                                     |
| `skills.ts`     | Skills and proficiency information                      |
| `systems.ts`    | Certifications and additional portfolio content         |
| `navigation.ts` | Navigation and section labels                           |

If your version contains fields such as:

```text
[ADD ...]
```

replace them with verified information before deploying the portfolio.

---

## 📄 Resume

Place your resume PDF inside:

```text
public/resume.pdf
```

The portfolio can then serve the resume directly through the **Download Resume** button.

---

## 📡 Contact Form

The contact section supports an external form endpoint.

Create a `.env` file in the project root:

```env
VITE_FORM_ENDPOINT=your_form_endpoint
```

Use `.env.example` as the configuration template.

For your own deployment, avoid committing `.env` files containing credentials, API keys, tokens, or other sensitive configuration.

---

## 🏎️ Design Concept

The portfolio takes inspiration from the engineering side of motorsport rather than functioning as a racing fan website.

The visual system uses concepts such as:

* Telemetry
* Starting lights
* Engineering dashboards
* System readouts
* Technical schematics
* Performance indicators
* Racing-inspired motion

These elements represent the ideas behind both motorsport engineering and cybersecurity:

**Precision. Performance. Engineering. Analysis. Security.**

---

## 🎮 DRS Easter Egg

There's a hidden interaction for desktop users.

Press:

```text
D R S
```

The ambient telemetry temporarily accelerates, creating a small DRS-inspired effect.

---

## ♿ Accessibility

The portfolio includes several accessibility considerations:

* Semantic HTML structure
* Keyboard-accessible navigation
* Visible focus states
* Accessible project filters
* Support for `prefers-reduced-motion`
* Touch-friendly alternatives to desktop interactions
* Graceful degradation of decorative animations

Users who prefer reduced motion receive a static but fully functional experience.

---

## ⚡ Performance

The visual experience is primarily created using:

* CSS
* SVG
* Tailwind CSS
* Framer Motion

Large background videos and unnecessary image-heavy assets are avoided to help keep the experience responsive.

---

## 🔮 Future Improvements

Planned improvements include:

* [ ] Add portfolio screenshots
* [ ] Add an animated preview GIF
* [ ] Add automated deployment
* [ ] Add GitHub Actions CI
* [ ] Add Lighthouse performance monitoring
* [ ] Expand project case studies
* [ ] Add architecture diagrams for major projects
* [ ] Add live project demos where available
* [ ] Improve SEO and social sharing previews
* [ ] Add automated testing

---

## 👨‍💻 Author

### Paulson Fernandes

Computer Science student focused on:

**Cybersecurity • Software Engineering • Artificial Intelligence • Cloud Security**

GitHub: **@ScriptSynapse**

---

## 📜 License

This repository contains a personal portfolio and original design work.

No open-source licence is currently specified. Unless a licence is added, the repository being publicly accessible should not be interpreted as permission to copy, redistribute, or reuse the project.

If this project is later released for public reuse, an appropriate licence can be added.

---

## ⭐ Support

If you like the portfolio or find something useful in the project, consider giving the repository a **star**.

It helps support the project and its future development.

---

<p align="center">
  <strong>Engineered with precision. Built for the web.</strong>
</p>
