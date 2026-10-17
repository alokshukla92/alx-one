import { describe, expect, it } from 'vitest'

import { securoPath, SECURO_BASE_PATH } from './securo-path'

describe('securoPath', () => {
  it('returns the module base', () => {
    expect(securoPath()).toBe(SECURO_BASE_PATH)
    expect(securoPath('/')).toBe(SECURO_BASE_PATH)
  })

  it('nests routes under /securo', () => {
    expect(securoPath('/transactions')).toBe('/securo/transactions')
    expect(securoPath('accounts/1')).toBe('/securo/accounts/1')
  })
})
