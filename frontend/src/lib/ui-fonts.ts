/** Built-in UI font presets (Google Fonts or system stack). Keys match `ui_font` app setting. */
export const UI_FONT_PRESETS = {
  inter: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', sans-serif",
    googleFontsHref:
      'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..800;1,14..32,400..800&display=swap',
  },
  geist: {
    family: "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
    googleFontsHref:
      'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap',
  },
  system: {
    family: "-apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', sans-serif",
    googleFontsHref: null,
  },
  dm_sans: {
    family: "'DM Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    googleFontsHref:
      'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&display=swap',
  },
  plus_jakarta: {
    family: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    googleFontsHref:
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..700;1,400..700&display=swap',
  },
  manrope: {
    family: "'Manrope', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    googleFontsHref:
      'https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&display=swap',
  },
  source_sans_3: {
    family: "'Source Sans 3', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    googleFontsHref:
      'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400..700;1,400..700&display=swap',
  },
} as const

export type UiFontId = keyof typeof UI_FONT_PRESETS

export const DEFAULT_UI_FONT: UiFontId = 'inter'

export const UI_FONT_IDS = Object.keys(UI_FONT_PRESETS) as UiFontId[]

const FONT_LINK_ID = 'securo-ui-font'

function ensureGoogleFontLink(href: string) {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = FONT_LINK_ID
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  if (link.href !== href) {
    link.href = href
  }
}

function removeGoogleFontLink() {
  document.getElementById(FONT_LINK_ID)?.remove()
}

/** Apply workspace font from admin `ui_font` setting (or CSS default when unset). */
export function applyUiFont(fontId: string | null | undefined) {
  const id: UiFontId =
    fontId && fontId in UI_FONT_PRESETS ? (fontId as UiFontId) : DEFAULT_UI_FONT
  const preset = UI_FONT_PRESETS[id]
  const root = document.documentElement
  // Tailwind v4 bakes Inter into body unless we inherit; override tokens + html font for immediate effect.
  root.style.setProperty('--font-sans', preset.family)
  root.style.setProperty('--default-font-family', preset.family)
  root.style.fontFamily = preset.family
  document.body.style.fontFamily = preset.family
  if (preset.googleFontsHref) {
    ensureGoogleFontLink(preset.googleFontsHref)
  } else {
    removeGoogleFontLink()
  }
}
