import { useId, useState } from 'react'

export type PricingToggleMode = 'mensual' | 'anual'

type PricingButton = {
  label: string
  href?: string
}

type PricingToggleCardsConfig = {
  variant: 'toggle-cards'
  title: string
  subtitles?: string | string[]
  toggle: {
    modes: Array<{ id: PricingToggleMode; label: string }>
    defaultMode: PricingToggleMode
  }
  plans: Array<{
    id: string
    name: string
    labelByMode: Record<PricingToggleMode, string>
    priceByMode: Record<PricingToggleMode, string>
  }>
  cta?: PricingButton
}

type PricingTwoCardsHeroConfig = {
  variant: 'two-cards-hero'
  title: string
  body: string
  emphasis?: string
  subheading?: string
  body2?: string
  visual?: {
    label?: string
  }
  cards: Array<{
    id: string
    labelTop: string
    title: string
    price: string
    button: PricingButton
  }>
}

type PricingCatalogCard = {
  id: string
  label: string
  title: string
  price: string
  button: PricingButton
}

type PricingCatalogGroup = {
  id: string
  tone: 'light' | 'dark'
  cards: PricingCatalogCard[]
  note?: string
}

type PricingCatalogConfig = {
  variant: 'catalog-grid'
  title: string
  subtitle?: string
  groups: PricingCatalogGroup[]
}

export type PricingSectionConfig =
  | PricingToggleCardsConfig
  | PricingTwoCardsHeroConfig
  | PricingCatalogConfig

type PricingSectionProps = {
  config: PricingSectionConfig
}

function SubtitleLines({
  lines,
  className = '',
}: {
  lines?: string | string[]
  className?: string
}) {
  if (!lines) return null
  const items = Array.isArray(lines) ? lines : [lines]

  return (
    <div className={['mt-4 space-y-2 text-lg/8 text-white/70', className].join(' ')}>
      {items.map((line, index) => (
        <p key={`${index}-${line}`}>{line}</p>
      ))}
    </div>
  )
}

function PricingButton({
  label,
  href,
  className = '',
}: PricingButton & { className?: string }) {
  const classes = [
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,0,0.75)]',
    className,
  ].join(' ')

  if (href) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    )
  }

  return (
    <button type="button" className={classes}>
      {label}
    </button>
  )
}

function ToggleCards({ config }: { config: PricingToggleCardsConfig }) {
  const toggleId = useId()
  const [mode, setMode] = useState<PricingToggleMode>(config.toggle.defaultMode)
  const panelId = `${toggleId}-panel`
  const isAnnual = mode === 'anual'

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {config.title}
          </h2>
          <SubtitleLines lines={config.subtitles} />
        </div>

        <div
          role="tablist"
          aria-label="Facturación"
          className="inline-flex gap-2 rounded-full border border-white/10 bg-black/30 p-1"
        >
          {config.toggle.modes.map((item) => {
            const isActive = item.id === mode
            const tabId = `${toggleId}-tab-${item.id}`

            return (
              <button
                key={item.id}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setMode(item.id)}
                className={[
                  'rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition',
                  isActive
                    ? 'bg-(--electrico) text-black'
                    : 'text-white/70 hover:text-white',
                ].join(' ')}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${toggleId}-tab-${mode}`}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {config.plans.map((plan) => (
          <div
            key={plan.id}
            className={[
              'rounded-3xl border p-6 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)]',
              isAnnual
                ? 'border-[rgba(255,255,255,0.18)] bg-[linear-gradient(160deg,rgba(117,59,208,0.92),rgba(58,31,112,0.95))] text-white'
                : 'border-[rgba(117,59,208,0.35)] bg-[rgba(255,255,255,0.06)] text-white',
            ].join(' ')}
          >
            <p
              className={[
                'text-sm font-semibold uppercase tracking-[0.16em]',
                isAnnual ? 'text-white/80' : 'text-(--electrico)',
              ].join(' ')}
            >
              {plan.labelByMode[mode]}
            </p>
            <h3 className="mt-4 text-2xl font-semibold">{plan.name}</h3>
            <p className="mt-4 text-3xl font-semibold text-(--electrico)">
              {plan.priceByMode[mode]}
            </p>
          </div>
        ))}
      </div>

      {config.cta ? (
        <div className="mt-10 flex justify-center">
          <PricingButton
            label={config.cta.label}
            href={config.cta.href}
            className="bg-(--uva) text-white hover:brightness-110"
          />
        </div>
      ) : null}
    </div>
  )
}

function TwoCardsHero({ config }: { config: PricingTwoCardsHeroConfig }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-[radial-gradient(120%_80%_at_20%_10%,rgba(255,255,0,0.12),transparent_60%),radial-gradient(110%_80%_at_80%_20%,rgba(117,59,208,0.25),transparent_60%),rgba(0,0,0,0.25)] p-6 text-center">
            {config.visual?.label ? (
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                {config.visual.label}
              </span>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {config.title}
          </h2>
          <p className="mt-4 text-lg/8 text-white/75">{config.body}</p>
          {config.emphasis ? (
            <p className="mt-4 text-lg/8 font-semibold text-white">
              {config.emphasis}
            </p>
          ) : null}
          {config.subheading ? (
            <h3 className="mt-6 text-3xl font-semibold">{config.subheading}</h3>
          ) : null}
          {config.body2 ? (
            <p className="mt-3 text-lg/8 text-white/75">{config.body2}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {config.cards.map((card) => (
          <div
            key={card.id}
            className="rounded-3xl border border-[rgba(117,59,208,0.45)] bg-[rgba(255,255,255,0.06)] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--electrico)">
              {card.labelTop}
            </p>
            <h4 className="mt-4 text-3xl font-semibold">{card.title}</h4>
            <p className="mt-4 text-4xl font-semibold text-(--electrico)">
              {card.price}
            </p>
            <div className="mt-6">
              <PricingButton
                label={card.button.label}
                href={card.button.href}
                className="border border-(--uva) text-white hover:bg-(--uva)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CatalogGrid({ config }: { config: PricingCatalogConfig }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {config.title}
        </h2>
        {config.subtitle ? (
          <p className="mt-4 text-lg/8 text-white/75">{config.subtitle}</p>
        ) : null}
      </div>

      <div className="mt-10 space-y-10">
        {config.groups.map((group) => {
          const isDark = group.tone === 'dark'
          return (
            <div key={group.id}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {group.cards.map((card) => (
                  <div
                    key={card.id}
                    className={[
                      'rounded-3xl border p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)]',
                      isDark
                        ? 'border-[rgba(255,255,255,0.18)] bg-[linear-gradient(160deg,rgba(117,59,208,0.92),rgba(58,31,112,0.95))] text-white'
                        : 'border-[rgba(117,59,208,0.35)] bg-[rgba(255,255,255,0.06)] text-white',
                    ].join(' ')}
                  >
                    <p
                      className={[
                        'text-sm font-semibold uppercase tracking-[0.18em]',
                        isDark ? 'text-white/80' : 'text-(--electrico)',
                      ].join(' ')}
                    >
                      {card.label}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold">{card.title}</h3>
                    <p className="mt-4 text-3xl font-semibold text-(--electrico)">
                      {card.price}
                    </p>
                    <div className="mt-6">
                      <PricingButton
                        label={card.button.label}
                        href={card.button.href}
                        className="bg-(--uva) text-white hover:brightness-110"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {group.note ? (
                <p className="mt-4 text-sm text-white/70">{group.note}</p>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function PricingSection({ config }: PricingSectionProps) {
  if (config.variant === 'toggle-cards') {
    return <ToggleCards config={config} />
  }

  if (config.variant === 'two-cards-hero') {
    return <TwoCardsHero config={config} />
  }

  return <CatalogGrid config={config} />
}
