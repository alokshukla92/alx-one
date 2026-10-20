import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { isValidHexColor, normalizeHexColor, sanitizeHexColorInput } from '@/lib/hex-color'

interface ThemeColorInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ThemeColorInput({ id, label, value, onChange, className }: ThemeColorInputProps) {
  const { t } = useTranslation()
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const pickerValue = isValidHexColor(value) ? value : '#12491F'
  const draftInvalid = draft.length > 0 && !isValidHexColor(draft)

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-xs" htmlFor={`${id}-hex`}>{label}</Label>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          id={`${id}-picker`}
          type="color"
          className="w-12 h-9 p-1 cursor-pointer shrink-0"
          value={pickerValue}
          onChange={(e) => {
            const next = e.target.value.toUpperCase()
            onChange(next)
            setDraft(next)
          }}
          aria-label={label}
        />
        <Input
          id={`${id}-hex`}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          className={cn(
            'font-mono max-w-[9rem] h-9',
            draftInvalid && 'border-destructive aria-invalid:border-destructive',
          )}
          placeholder="#12491F"
          value={draft}
          onChange={(e) => {
            const next = sanitizeHexColorInput(e.target.value)
            if (next === null) return
            setDraft(next)
            const normalized = normalizeHexColor(next)
            if (normalized) onChange(normalized)
          }}
          onBlur={() => {
            const normalized = normalizeHexColor(draft)
            if (normalized) {
              onChange(normalized)
              setDraft(normalized)
            } else {
              setDraft(value)
            }
          }}
          aria-invalid={draftInvalid}
          aria-describedby={draftInvalid ? `${id}-hex-error` : undefined}
        />
      </div>
      {draftInvalid && (
        <p id={`${id}-hex-error`} className="text-xs text-destructive">
          {t('settings.themeColorHexInvalid', { defaultValue: 'Use a 6-digit hex code like #12491F' })}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        {t('settings.themeColorHexHint', { defaultValue: 'Pick a swatch or enter #RRGGBB' })}
      </p>
    </div>
  )
}
