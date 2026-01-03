import { ExportedSite } from "@/lib/export/site";
import type { PublishResult } from "@/types/publish";

const HOOK_ENV_KEY = "VERCEL_DEPLOY_HOOK_URL";

export async function triggerVercelDeploy(
  siteId: string,
  _exported: ExportedSite
): Promise<PublishResult> {
  const hookUrl = process.env[HOOK_ENV_KEY];

  if (!hookUrl) {
    return {
      ok: false,
      error: `Missing ${HOOK_ENV_KEY} environment variable`,
    };
  }

  try {
    const res = await fetch(hookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Many Vercel deploy hooks ignore the body, but we include siteId for debugging.
      body: JSON.stringify({
        source: "buildwithai",
        siteId,
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        error: `Vercel deploy hook failed with status ${res.status}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error?.message ?? "Unknown error triggering Vercel deploy",
    };
  }
}
