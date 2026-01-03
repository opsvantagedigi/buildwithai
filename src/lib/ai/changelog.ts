import type { VersionSnapshot } from "@/types/publish";

const OLLAMA_ENDPOINT =
  process.env.OLLAMA_ENDPOINT || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

type ChangelogInput = {
  previous?: VersionSnapshot | null;
  current: VersionSnapshot;
};

function buildPrompt(input: ChangelogInput): string {
  const { previous, current } = input;

  const prevVersion = previous?.version ?? null;
  const prevState = previous?.state ?? null;
  const currentVersion = current.version;
  const currentState = current.state;

  return `
You are an assistant that writes concise, human-readable changelogs for a website builder.

You will be given two JSON states:
- "previous" (may be null)
- "current"

Each state represents the full builder state of a site in a "Build With AI" platform.

Your job is to describe what changed between "previous" and "current" in clear, plain language, focusing on:
- New sections or blocks added
- Sections or blocks removed
- Text changes in key headings, subheadings, and CTAs
- Notable layout or content reorganizations
- Any high-level structural changes

If there is no previous state, write a changelog as if this is the first published version of the site.

Return:
- 2–5 short bullet points
- No markdown bullet characters (just start each line with "- ")

Previous (version: ${prevVersion ?? "none"}):
${JSON.stringify(prevState, null, 2)}

Current (version: ${currentVersion}):
${JSON.stringify(currentState, null, 2)}
`;
}

export async function generateChangelogWithOllama(
  input: ChangelogInput
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
      console.error(
        "[changelog] Ollama request failed with status",
        res.status
      );
      return null;
    }

    const data = await res.json().catch(() => null);
    const text = data?.response ?? data?.text ?? null;

    if (!text || typeof text !== "string") {
      return null;
    }

    return text.trim();
  } catch (error) {
    console.error("[changelog] Ollama error", error);
    return null;
  }
}
