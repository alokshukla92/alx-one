import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export type ShellLogoVariant = 'app' | 'mark' | 'full'

interface ShellLogoProps {
  size?: number
  className?: string
  variant?: ShellLogoVariant
  tone?: 'light' | 'onDark' | 'auto'
}

const FULL_VIEW_BOX = '0 0 786 676'
const LOGO_WORDMARK_SRC = '/alx-logo.svg'

function resolveAppIconSrc(tone: ShellLogoProps['tone'], isDark: boolean): string {
  if (tone === 'light') return '/alx-app-icon.svg'
  if (tone === 'onDark' || isDark) return '/alx-app-icon-dark.svg'
  return '/alx-app-icon.svg'
}

function resolveMarkSrc(tone: ShellLogoProps['tone'], isDark: boolean): string {
  if (tone === 'onDark' || isDark) return '/alx-mark-dark.svg'
  return '/alx-mark.svg'
}

export function ShellLogo({
  size = 24,
  className,
  variant = 'app',
  tone = 'auto',
}: ShellLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  if (variant === 'full') {
    const height = Math.round(size * (676 / 786))
    return (
      <svg
        width={size}
        height={height}
        viewBox={FULL_VIEW_BOX}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className={cn((tone === 'onDark' || isDark) && 'opacity-95', className)}
        shapeRendering="geometricPrecision"
        role="img"
        aria-hidden
      >
        <image href={LOGO_WORDMARK_SRC} width="786" height="676" preserveAspectRatio="xMidYMin meet" />
      </svg>
    )
  }

  const imgClass = cn('shrink-0 object-contain', className)
  const src =
    variant === 'mark'
      ? resolveMarkSrc(tone, isDark)
      : resolveAppIconSrc(tone, isDark)

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      className={imgClass}
      decoding="async"
      draggable={false}
    />
  )
}
