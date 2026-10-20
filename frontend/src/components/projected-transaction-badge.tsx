import { useTranslation } from 'react-i18next'

/** Canonical badge for a virtual transaction projection. */
export function ProjectedTransactionBadge() {
  const { t } = useTranslation()

  return (
    <span className="alx-badge alx-badge-projected shrink-0">
      {t('transactions.projected')}
    </span>
  )
}
