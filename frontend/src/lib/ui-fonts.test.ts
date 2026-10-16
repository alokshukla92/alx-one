/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'

import { applyUiFont, UI_FONT_PRESETS } from './ui-fonts'

afterEach(() => {
  document.documentElement.style.removeProperty('--font-sans')
  document.documentElement.style.removeProperty('--default-font-family')
  document.documentElement.style.removeProperty('font-family')
  document.body.style.removeProperty('font-family')
  document.getElementById('securo-ui-font')?.remove()
})

describe('applyUiFont', () => {
  it('defaults to Inter when setting is missing', () => {
    applyUiFont(null)
    expect(document.documentElement.style.getPropertyValue('--default-font-family')).toContain('Inter')
    expect(document.getElementById('securo-ui-font')).toBeTruthy()
  })

  it('uses system stack without a Google Fonts link', () => {
    applyUiFont('system')
    expect(document.documentElement.style.getPropertyValue('--default-font-family')).toContain('apple-system')
    expect(document.getElementById('securo-ui-font')).toBeNull()
  })

  it('loads Geist when selected', () => {
    applyUiFont('geist')
    const link = document.getElementById('securo-ui-font') as HTMLLinkElement
    expect(link?.href).toContain('Geist')
    expect(UI_FONT_PRESETS.geist.family).toContain('Geist')
  })
})
