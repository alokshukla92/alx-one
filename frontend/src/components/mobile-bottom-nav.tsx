import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeftRight,
  BarChart3,
  Building2,
  Home,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { securoPath } from '@/lib/securo-path'
import type { ModuleId } from '@/lib/modules'

type TabKey = 'dashboard' | 'transactions' | 'accounts' | 'reports' | 'more'

const TABS: {
  key: TabKey
  labelKey: string
  path?: string
  icon: React.ElementType
  module?: ModuleId
  match?: (pathname: string) => boolean
}[] = [
  {
    key: 'dashboard',
    labelKey: 'nav.dashboard',
    path: securoPath(),
    icon: Home,
    match: (p) => p === securoPath() || p === `${securoPath()}/`,
  },
  {
    key: 'transactions',
    labelKey: 'nav.transactions',
    path: securoPath('/transactions'),
    icon: ArrowLeftRight,
    module: 'transactions',
    match: (p) => p.startsWith(securoPath('/transactions')),
  },
  {
    key: 'accounts',
    labelKey: 'nav.accounts',
    path: securoPath('/accounts'),
    icon: Building2,
    module: 'accounts',
    match: (p) => p.startsWith(securoPath('/accounts')),
  },
  {
    key: 'reports',
    labelKey: 'nav.reports',
    path: securoPath('/reports'),
    icon: BarChart3,
    module: 'reports',
    match: (p) => p.startsWith(securoPath('/reports')),
  },
  { key: 'more', labelKey: 'nav.more', icon: Menu },
]

interface MobileBottomNavProps {
  hasModule: (id: ModuleId) => boolean
  onMore: () => void
}

export function MobileBottomNav({ hasModule, onMore }: MobileBottomNavProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const pathname = location.pathname

  const visibleTabs = TABS.filter((tab) => {
    if (tab.key === 'more') return true
    if (tab.module && !hasModule(tab.module)) return false
    return true
  })

  const isMoreActive =
    !visibleTabs.some(
      (tab) =>
        tab.key !== 'more' &&
        tab.match?.(pathname),
    )

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label={t('nav.mobileBottom', { defaultValue: 'Main navigation' })}
    >
      <div className="mx-auto flex h-[3.25rem] max-w-lg items-stretch justify-around px-1">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon
          const isActive =
            tab.key === 'more'
              ? isMoreActive
              : (tab.match?.(pathname) ?? false)

          if (tab.key === 'more') {
            return (
              <button
                key={tab.key}
                type="button"
                onClick={onMore}
                className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-[10px] font-medium text-muted-foreground"
              >
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                    isActive && 'bg-[var(--color-primary-soft)] text-[var(--color-green-dark)]',
                  )}
                >
                  <Icon size={20} strokeWidth={2} className={cn(isActive && 'text-[var(--color-green-dark)]')} />
                </span>
                <span className={cn(isActive && 'text-[var(--color-green-dark)]')}>{t(tab.labelKey, { defaultValue: 'More' })}</span>
              </button>
            )
          }

          return (
            <Link
              key={tab.key}
              to={tab.path!}
              className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-[10px] font-medium text-muted-foreground"
            >
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                  isActive && 'bg-[var(--color-primary-soft)]',
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className={cn(isActive ? 'text-[var(--color-green-dark)]' : 'text-muted-foreground')}
                />
              </span>
              <span className={cn('truncate max-w-full', isActive && 'text-[var(--color-green-dark)]')}>
                {t(tab.labelKey)}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
