/** Canonical AlxOne / Securo brand colors (admin theme picker + CSS tokens). */
export const ALXONE_THEME_COLOR_LIGHT = '#12491F'
export const ALXONE_THEME_COLOR_DARK = '#98E456'
export const ALXONE_UI_FONT_DEFAULT = 'system'
export const ALXONE_UI_FONT_SCALE_DEFAULT = 'standard'

const LEGACY_LIGHT_THEME = new Set(['#ffffff', '#fff'])
const LEGACY_DARK_THEME = new Set(['#000000', '#000', '#818cf8'])

/** Map stored admin settings to AlxOne defaults (ignores legacy indigo/white). */
export function resolveBrandThemeSettings(
  light: string | null | undefined,
  dark: string | null | undefined,
  font: string | null | undefined,
  fontScale?: string | null | undefined,
): { light: string; dark: string; font: string; fontScale: string } {
  const lightNorm = light?.trim().toLowerCase()
  const darkNorm = dark?.trim().toLowerCase()

  return {
    light:
      lightNorm && !LEGACY_LIGHT_THEME.has(lightNorm)
        ? light!
        : ALXONE_THEME_COLOR_LIGHT,
    dark:
      darkNorm && !LEGACY_DARK_THEME.has(darkNorm)
        ? dark!
        : ALXONE_THEME_COLOR_DARK,
    font: font && font.length > 0 ? font : ALXONE_UI_FONT_DEFAULT,
    fontScale:
      fontScale && fontScale.length > 0 ? fontScale : ALXONE_UI_FONT_SCALE_DEFAULT,
  }
}
