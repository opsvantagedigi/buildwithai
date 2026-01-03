const ADMIN_HEADER = 'x-admin-token';

export function requireAdminAuth(request: Request) {
  const expected = process.env.ADMIN_DASHBOARD_TOKEN;

  if (!expected) {
    // Fail loud in debug endpoints if not configured
    console.warn('[ADMIN AUTH] ADMIN_DASHBOARD_TOKEN not configured');

    return {
      ok: false,
      status: 500,
      body: { error: 'ADMIN_DASHBOARD_TOKEN not configured' },
    };
  }

  const provided = request.headers.get(ADMIN_HEADER);

  if (!provided || provided !== expected) {
    console.warn('[ADMIN AUTH] Unauthorized access attempt to debug endpoint', {
      headerPresent: Boolean(provided),
    });

    return {
      ok: false,
      status: 401,
      body: { error: 'Unauthorized' },
    };
  }

  return { ok: true };
}
