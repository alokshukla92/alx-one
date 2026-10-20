import { describe, expect, it } from 'vitest'

import {
  ALXONE_THEME_COLOR_DARK,
  ALXONE_THEME_COLOR_LIGHT,
  resolveBrandThemeSettings,
} from './alxone-brand'

describe('resolveBrandThemeSettings', () => {
  it('uses AlxOne forest defaults when settings are missing', () => {
    expect(resolveBrandThemeSettings(null, null, null)).toEqual({
      light: ALXONE_THEME_COLOR_LIGHT,
      dark: ALXONE_THEME_COLOR_DARK,
      font: 'system',
      fontScale: 'standard',
    })
  })

  it('replaces legacy white/black and indigo dark accents', () => {
    expect(resolveBrandThemeSettings('#FFFFFF', '#818CF8', null)).toEqual({
      light: ALXONE_THEME_COLOR_LIGHT,
      dark: ALXONE_THEME_COLOR_DARK,
      font: 'system',
      fontScale: 'standard',
    })
  })

  it('keeps custom brand colours when set', () => {
    expect(resolveBrandThemeSettings('#236B35', '#A8ED6B', 'inter', 'compact')).toEqual({
      light: '#236B35',
      dark: '#A8ED6B',
      font: 'inter',
      fontScale: 'compact',
    })
  })
})
