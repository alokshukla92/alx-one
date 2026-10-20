/** Matches backend admin theme color validation (#RRGGBB). */
export const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/

export function isValidHexColor(value: string): boolean {
  return HEX_COLOR_PATTERN.test(value.trim())
}

/** Allow typing; returns normalized partial or full hex, or null if invalid characters. */
export function sanitizeHexColorInput(raw: string): string | null {
  let v = raw.trim()
  if (!v) return ''
  if (!v.startsWith('#')) v = `#${v}`
  v = v.slice(0, 7)
  if (!/^#[0-9A-Fa-f]*$/.test(v)) return null
  return v
}

export function normalizeHexColor(value: string): string | null {
  const v = sanitizeHexColorInput(value)
  if (v === null || v === '' || !isValidHexColor(v)) return null
  return v.toUpperCase()
}
