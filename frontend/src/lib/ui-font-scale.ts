/** Text size presets — keys match admin `ui_font_scale` setting. */
export const UI_FONT_SCALE_PRESETS = {
  compact: {
    body: '0.8125rem',
    label: '0.6875rem',
    button: '0.8125rem',
    section: '0.9375rem',
    title: '1.375rem',
    titleLg: '1.5rem',
    balance: 'clamp(1.875rem, 4vw, 2.5rem)',
  },
  standard: {
    body: '0.875rem',
    label: '0.75rem',
    button: '0.875rem',
    section: '1rem',
    title: '1.5rem',
    titleLg: '1.625rem',
    balance: 'clamp(2.125rem, 4.5vw, 2.75rem)',
  },
  comfortable: {
    body: '0.9375rem',
    label: '0.8125rem',
    button: '0.9375rem',
    section: '1.0625rem',
    title: '1.625rem',
    titleLg: '1.75rem',
    balance: 'clamp(2.375rem, 5vw, 3rem)',
  },
} as const

export type UiFontScaleId = keyof typeof UI_FONT_SCALE_PRESETS

export const DEFAULT_UI_FONT_SCALE: UiFontScaleId = 'standard'

export const UI_FONT_SCALE_IDS = Object.keys(UI_FONT_SCALE_PRESETS) as UiFontScaleId[]

const SCALE_CSS_VARS = [
  ['--text-body', 'body'],
  ['--text-label', 'label'],
  ['--text-button', 'button'],
  ['--text-section', 'section'],
  ['--text-title', 'title'],
  ['--text-title-lg', 'titleLg'],
  ['--text-balance', 'balance'],
] as const

/** Apply admin `ui_font_scale` (updates AlxOne typography CSS variables). */
export function applyUiFontScale(scaleId: string | null | undefined) {
  const id: UiFontScaleId =
    scaleId && scaleId in UI_FONT_SCALE_PRESETS ? (scaleId as UiFontScaleId) : DEFAULT_UI_FONT_SCALE
  const preset = UI_FONT_SCALE_PRESETS[id]
  const root = document.documentElement
  for (const [cssVar, key] of SCALE_CSS_VARS) {
    root.style.setProperty(cssVar, preset[key])
  }
}
