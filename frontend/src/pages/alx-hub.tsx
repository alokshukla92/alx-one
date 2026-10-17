import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import { ShellLogo } from '@/components/shell-logo'
import { ALX_PRODUCTS } from '@/lib/alx-products'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'

export default function AlxHubPage() {
  const { t } = useTranslation()
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-14 items-center justify-between border-b px-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <ShellLogo size={26} className="text-primary shrink-0" />
          <span className="text-lg font-bold tracking-tight">{t('alx.platformName')}</span>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => logout()}>
          {t('auth.logout')}
        </Button>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-14">
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutGrid className="size-4" aria-hidden />
            {t('alx.hub.eyebrow')}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t('alx.hub.title')}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{t('alx.hub.subtitle')}</p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {ALX_PRODUCTS.map((product) => {
            const name = t(product.nameKey)
            const description = t(product.descriptionKey)
            const cardClass = cn(
              'group relative flex flex-col rounded-xl border bg-card p-5 text-left shadow-sm transition-colors',
              product.available
                ? 'hover:border-primary/40 hover:bg-accent/30'
                : 'opacity-60 cursor-not-allowed',
            )

            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-lg">{name}</h2>
                    {!product.available && (
                      <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {t('alx.hub.comingSoon')}
                      </span>
                    )}
                  </div>
                  {product.available && (
                    <ArrowRight
                      className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{description}</p>
              </>
            )

            return (
              <li key={product.id}>
                {product.available ? (
                  <Link to={product.path} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cardClass} aria-disabled="true">
                    {inner}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
