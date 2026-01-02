export function getRequestIdHeader(): string {
  try {
    // Node 18+ / modern runtimes
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return (globalThis as any).crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`
  } catch (_) {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`
  }
}
