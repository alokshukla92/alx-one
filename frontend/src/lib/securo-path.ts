/** URL prefix for the ALX Securo (finance) product module. */
export const SECURO_BASE_PATH = '/securo'

/** Build a path inside the Securo module. */
export function securoPath(path = ''): string {
  if (!path || path === '/') return SECURO_BASE_PATH
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SECURO_BASE_PATH}${normalized}`
}
