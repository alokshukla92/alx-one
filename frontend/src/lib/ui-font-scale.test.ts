/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'

import { applyUiFontScale, DEFAULT_UI_FONT_SCALE, UI_FONT_SCALE_PRESETS } from './ui-font-scale'

const VARS = [
  '--text-body',
  '--text-label',
  '--text-button',
  '--text-section',
  '--text-title',
  '--text-title-lg',
  '--text-balance',
]

afterEach(() => {
  for (const name of VARS) {
    document.documentElement.style.removeProperty(name)
  }
})

describe('applyUiFontScale', () => {
  it('defaults to standard', () => {
    applyUiFontScale(null)
    expect(document.documentElement.style.getPropertyValue('--text-body')).toBe(
      UI_FONT_SCALE_PRESETS[DEFAULT_UI_FONT_SCALE].body,
    )
  })

  it('applies compact sizes', () => {
    applyUiFontScale('compact')
    expect(document.documentElement.style.getPropertyValue('--text-body')).toBe('0.8125rem')
  })
})
