export async function triggerVercelStagingDeploy() {
  const webhook = process.env.VERCEL_STAGING_WEBHOOK_URL;

  if (!webhook) {
    console.warn("[staging] Missing VERCEL_STAGING_WEBHOOK_URL");
    return { ok: false, url: null };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
    });

    if (!res.ok) {
      console.error("[staging] Vercel staging deploy failed", res.status);
      return { ok: false, url: null };
    }

    const data = await res.json().catch(() => ({}));

    return {
      ok: true,
      url: data?.url ?? null,
    };
  } catch (error) {
    console.error("[staging] Unexpected error", error);
    return { ok: false, url: null };
  }
}
