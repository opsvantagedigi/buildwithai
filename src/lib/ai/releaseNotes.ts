import type { VersionSnapshot } from "@/types/publish";

const OLLAMA_ENDPOINT =
  process.env.OLLAMA_ENDPOINT || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

type ReleaseNotesInput = {
  snapshot: VersionSnapshot;
  changelog: string | null;
  productionUrl?: string | null;
};

function buildPrompt(input: ReleaseNotesInput): string {
  const { snapshot, changelog, productionUrl } = input;

  return `
You are an assistant that writes professional, concise release notes.

You will be given:
- Version number
- Timestamp
- Changelog text
- Production URL (optional)

Write a short, clear release note suitable for clients and enterprise users.

Guidelines:
- Professional tone
- 2–4 bullet points
- No marketing language
- No emojis
- No markdown formatting
- No unnecessary adjectives

Version: ${snapshot.version}
Timestamp: ${new Date(snapshot.timestamp).toISOString()}
Production URL: ${productionUrl ?? "none"}

Changelog:
${changelog ?? "No changelog available"}
`;
}

export async function generateReleaseNotesWithOllama(
  input: ReleaseNotesInput
): Promise<string | null> {
  try {
    const prompt = buildPrompt(input);

    const res = await fetch(`${OLLAMA_ENDPOINT}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
      }),
    });

    if (!res.ok) {
      console.error("[releaseNotes] Ollama request failed", res.status);
      return null;
    }

    const data = await res.json().catch(() => null);
    const text = data?.response ?? data?.text ?? null;

    if (!text || typeof text !== "string") return null;

    return text.trim();
  } catch (error) {
    console.error("[releaseNotes] Ollama error", error);
    return null;
  }
}
