export async function triggerVercelPreviewDeploy() {
  const webhook = process.env.VERCEL_PREVIEW_WEBHOOK_URL;

  if (!webhook) {
    console.warn("[preview] Missing VERCEL_PREVIEW_WEBHOOK_URL");
    return { ok: false, url: null };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
    });

    if (!res.ok) {
      console.error("[preview] Vercel preview deploy failed", res.status);
      return { ok: false, url: null };
    }

    const data = await res.json().catch(() => ({}));

    return {
      ok: true,
      url: data?.url ?? null,
    };
  } catch (error) {
    console.error("[preview] Unexpected error", error);
    return { ok: false, url: null };
  }
}
