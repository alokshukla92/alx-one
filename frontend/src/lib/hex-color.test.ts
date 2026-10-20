import { describe, expect, it } from 'vitest'

import { isValidHexColor, normalizeHexColor, sanitizeHexColorInput } from './hex-color'

describe('hex-color', () => {
  it('validates #RRGGBB', () => {
    expect(isValidHexColor('#12491F')).toBe(true)
    expect(isValidHexColor('#fff')).toBe(false)
    expect(isValidHexColor('12491F')).toBe(false)
  })

  it('sanitizes partial input', () => {
    expect(sanitizeHexColorInput('12491')).toBe('#12491')
    expect(sanitizeHexColorInput('#12GG')).toBe(null)
  })

  it('normalizes complete codes to uppercase', () => {
    expect(normalizeHexColor('#98e456')).toBe('#98E456')
    expect(normalizeHexColor('#98e45')).toBe(null)
  })
})
