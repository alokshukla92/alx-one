/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'

import { applyUiFont, UI_FONT_PRESETS } from './ui-fonts'

afterEach(() => {
  document.documentElement.style.removeProperty('--font-sans')
  document.documentElement.style.removeProperty('--font-mono')
  document.documentElement.style.removeProperty('--default-font-family')
  document.documentElement.style.removeProperty('font-family')
  document.body.style.removeProperty('font-family')
  document.getElementById('securo-ui-font')?.remove()
})

describe('applyUiFont', () => {
  it('defaults to system stack when setting is missing', () => {
    applyUiFont(null)
    expect(document.documentElement.style.getPropertyValue('--default-font-family')).toContain('apple-system')
    expect(document.getElementById('securo-ui-font')).toBeNull()
  })

  it('uses system stack without a Google Fonts link', () => {
    applyUiFont('system')
    expect(document.documentElement.style.getPropertyValue('--default-font-family')).toContain('apple-system')
    expect(document.documentElement.style.getPropertyValue('--font-mono')).toContain('apple-system')
    expect(document.getElementById('securo-ui-font')).toBeNull()
  })

  it('syncs mono token for amount labels in charts', () => {
    applyUiFont('sf_pro_display')
    expect(document.documentElement.style.getPropertyValue('--font-mono')).toContain('SF Pro Display')
  })

  it('loads Geist when selected', () => {
    applyUiFont('geist')
    const link = document.getElementById('securo-ui-font') as HTMLLinkElement
    expect(link?.href).toContain('Geist')
    expect(UI_FONT_PRESETS.geist.family).toContain('Geist')
  })
})
