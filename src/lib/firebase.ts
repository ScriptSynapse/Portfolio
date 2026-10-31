/**
 * Optional Firestore delivery for the contact form — via Firestore's REST API.
 *
 * The site only ever needs to *create* one document, so the full Firebase SDK
 * (and its large gRPC / protobuf / websocket dependency tree, which was the
 * source of `npm audit` warnings) is not used. Access is still enforced by the
 * Firestore security rules in firestore.rules.
 *
 * Configure with VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID (.env.example).
 */
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

export const hasFirebaseConfig = Boolean(apiKey && projectId);

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "");
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

/** Creates contactMessages/{id} with a server timestamp. Returns true on success. */
export async function saveContactMessage(msg: ContactMessage): Promise<boolean> {
  if (!hasFirebaseConfig) return false;
  const base = `projects/${encodeURIComponent(projectId!)}/databases/(default)/documents`;
  const str = (v: string) => ({ stringValue: v });
  const body = {
    writes: [
      {
        update: {
          name: `${base}/contactMessages/${newId()}`,
          fields: {
            name: str(msg.name),
            email: str(msg.email),
            subject: str(msg.subject),
            message: str(msg.message),
            source: str("portfolio"),
          },
        },
        updateTransforms: [{ fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" }],
        currentDocument: { exists: false },
      },
    ],
  };
  const res = await fetch(`https://firestore.googleapis.com/v1/${base}:commit?key=${encodeURIComponent(apiKey!)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.ok;
}
