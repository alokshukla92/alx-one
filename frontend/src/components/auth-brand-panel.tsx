import { useTranslation } from 'react-i18next'
import { ShellLogo } from '@/components/shell-logo'

// Left-hand brand panel for the auth/onboarding screens. Forest-green field
// with a slow lime aurora drifting behind an oversized, translucent
// shell watermark. Decorative only — hidden below `lg`, where the form takes
// the full width and carries its own compact header.
export function AuthBrandPanel() {
  const { t } = useTranslation()

  return (
    <div
      className="relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between"
      style={{
        background:
          'linear-gradient(150deg, #12491F 0%, #18552A 48%, #236B35 100%)',
      }}
    >
      {/* Soft animated aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="securo-aurora securo-aurora-1" />
        <div className="securo-aurora securo-aurora-2" />
        <div className="securo-aurora securo-aurora-3" />
      </div>

      {/* Oversized translucent shell, bleeding off the lower-right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -bottom-24 text-white/[0.06]"
        style={{ transform: 'rotate(-8deg)' }}
      >
        <ShellLogo size={480} variant="mark" tone="onDark" className="opacity-[0.08]" />
      </div>

      {/* Depth: gentle vignette toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 90% at 78% 8%, transparent 42%, rgba(10, 30, 14, 0.45) 100%)',
        }}
      />

      {/* Wordmark */}
      <div className="relative flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/15">
          <ShellLogo size={28} variant="app" tone="onDark" />
        </div>
        <span className="text-lg font-medium tracking-tight">{t('alx.platformName')}</span>
      </div>

      {/* Tagline */}
      <div className="relative max-w-md space-y-5">
        <h2 className="text-[2.6rem] font-normal leading-[1.08] tracking-tight">
          {t('setup.brandTagline')}
        </h2>
        <p className="max-w-sm text-base leading-relaxed text-white/70">
          {t('setup.brandSubtitle')}
        </p>
        <div className="flex items-center gap-2.5 pt-1 text-xs font-medium text-white/55">
          <span>{t('setup.brandOpen')}</span>
          <span className="h-1 w-1 rounded-full bg-white/35" />
          <span>{t('setup.brandSelfHosted')}</span>
          <span className="h-1 w-1 rounded-full bg-white/35" />
          <span>{t('setup.brandPrivate')}</span>
        </div>
      </div>
    </div>
  )
}
