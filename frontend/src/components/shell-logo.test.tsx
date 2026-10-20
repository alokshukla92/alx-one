import { describe, expect, it, vi, beforeEach } from 'vitest'

import { ShellLogo } from '@/components/shell-logo'
import { renderWithProviders } from '@/test/utils'

const useThemeMock = vi.fn(() => ({ resolvedTheme: 'light' }))

vi.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}))

describe('ShellLogo', () => {
  beforeEach(() => {
    useThemeMock.mockReturnValue({ resolvedTheme: 'light' })
  })

  it('renders the light app icon by default after mount', () => {
    const { container } = renderWithProviders(<ShellLogo />)

    expect(container.querySelector('img')).toHaveAttribute('src', '/alx-app-icon.svg')
  })

  it('uses the dark app icon when the theme is dark', () => {
    useThemeMock.mockReturnValue({ resolvedTheme: 'dark' })
    const { container } = renderWithProviders(<ShellLogo />)

    expect(container.querySelector('img')).toHaveAttribute('src', '/alx-app-icon-dark.svg')
  })

  it('honours an explicit size', () => {
    const { container } = renderWithProviders(<ShellLogo size={64} tone="light" />)

    expect(container.querySelector('img')).toHaveAttribute('width', '64')
  })

  it('uses the mark variant', () => {
    const { container } = renderWithProviders(<ShellLogo variant="mark" tone="light" />)

    expect(container.querySelector('img')).toHaveAttribute('src', '/alx-mark.svg')
  })

  it('loads the full wordmark svg for the full variant', () => {
    const { container } = renderWithProviders(<ShellLogo variant="full" size={100} />)

    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 786 676')
  })
})
