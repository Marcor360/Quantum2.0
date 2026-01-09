import { type ReactNode, useId, useMemo, useState } from 'react'
import Header from '../../assets/components/Header'

export type ServiceTemplateBillingMode = 'mensual' | 'anual'

export type ServiceTemplateConfig = {
  title: string
  titleSvgSrc: string
  hero?: {
    subtitle?: string
  }
  intro?: {
    video?: { type: 'embed' | 'placeholder'; url?: string }
    kicker?: string
    heading?: string
    tag?: string
    body?: string
  }
  sections?: Array<{
    id: string
    title: string
    body?: string
    bullets?: string[]
    note?: string
  }>
  tabs?: {
    title: string
    items: Array<{
      id: string
      label: string
      iconSvgSrc?: string
      title?: string
      body?: string
      bullets?: string[]
      note?: string
    }>
  }
  pricing?: {
    title: string
    subtitle?: string
    billingModes: Array<{ id: ServiceTemplateBillingMode; label: string }>
    defaultMode: ServiceTemplateBillingMode
    plans: Array<{
      id: string
      labelTop: string
      name: string
      priceByMode: Record<ServiceTemplateBillingMode, string>
    }>
  }
  cta?: {
    title: string
    body?: string
    priceText?: string
    icons?: string[]
  }
}

type ServiceTemplateProps = {
  config: ServiceTemplateConfig
}

function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-3xl border border-purple-500/25 bg-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-md',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function Bullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm/6 text-white/80">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-(--electrico)"
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
}

function Note({ children }: { children: string }) {
  return (
    <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm/6 text-white/75">
      <span className="font-medium text-white/80">Nota:</span> {children}
    </p>
  )
}

export default function ServiceTemplate({ config }: ServiceTemplateProps) {
  const tabBaseId = useId()
  const firstTab = config.tabs?.items[0]?.id
  const [activeTabId, setActiveTabId] = useState<string | undefined>(firstTab)
  const activeTab = useMemo(() => {
    if (!config.tabs) return undefined
    const current = config.tabs.items.find((item) => item.id === activeTabId)
    return current ?? config.tabs.items[0]
  }, [activeTabId, config.tabs])

  const [billingMode, setBillingMode] = useState<ServiceTemplateBillingMode>(
    config.pricing?.defaultMode ?? 'mensual'
  )

  return (
    <main className="relative min-h-screen overflow-hidden bg-(--mate) text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_10%_0%,rgba(255,255,0,0.12),transparent_60%),radial-gradient(90%_80%_at_90%_10%,rgba(117,59,208,0.18),transparent_60%),radial-gradient(120%_90%_at_40%_90%,rgba(255,110,243,0.10),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(0,0,0,0),rgba(0,0,0,0.78))]"
      />

      <div className="relative z-10">
        <Header />

        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-8">
          <section aria-label={config.title} className="space-y-4">
            <h1 className="sr-only">{config.title}</h1>
            <img
              src={config.titleSvgSrc}
              alt=""
              aria-hidden="true"
              className="h-14 w-auto max-w-full drop-shadow-[0_18px_50px_rgba(0,0,0,0.55)] sm:h-16"
              decoding="async"
              loading="lazy"
            />
            {config.hero?.subtitle && (
              <p className="max-w-2xl text-balance text-base/7 text-white/75">
                {config.hero.subtitle}
              </p>
            )}
          </section>

          {config.intro && (
            <section className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-10">
              {config.intro.video && (
                <div className="lg:col-span-7">
                  <Card className="overflow-hidden">
                    <div className="aspect-video w-full">
                      {config.intro.video.type === 'embed' &&
                      config.intro.video.url ? (
                        <iframe
                          className="h-full w-full"
                          src={config.intro.video.url}
                          title={`${config.title} video`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-white/5 to-black/20 px-6 text-center">
                          <p className="text-sm font-medium text-white/85">
                            Video (16:9)
                          </p>
                          <p className="text-xs text-white/60">
                            Placeholder — aquí irá el video
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              <div className={config.intro.video ? 'lg:col-span-5' : ''}>
                <Card className="p-6 sm:p-8">
                  {config.intro.kicker && (
                    <p className="text-xs font-semibold tracking-[0.18em] text-white/65">
                      {config.intro.kicker}
                    </p>
                  )}
                  {config.intro.heading && (
                    <p className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
                      {config.intro.heading}
                    </p>
                  )}
                  {config.intro.tag && (
                    <p className="mt-4 inline-flex rounded-full border border-[rgba(255,255,0,0.30)] bg-[rgba(255,255,0,0.10)] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-(--electrico)">
                      {config.intro.tag}
                    </p>
                  )}
                  {config.intro.body && (
                    <p className="mt-5 text-sm/7 text-white/75">
                      {config.intro.body}
                    </p>
                  )}
                </Card>
              </div>
            </section>
          )}

          {config.sections?.length ? (
            <section className="mt-12 space-y-6 lg:mt-14">
              {config.sections.map((section) => (
                <Card key={section.id} className="p-6 sm:p-8">
                  <div id={section.id} className="scroll-mt-28">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {section.title}
                    </h2>
                    {section.body && (
                      <p className="mt-4 text-sm/7 text-white/75">
                        {section.body}
                      </p>
                    )}
                    {section.bullets?.length ? <Bullets bullets={section.bullets} /> : null}
                    {section.note ? <Note>{section.note}</Note> : null}
                  </div>
                </Card>
              ))}
            </section>
          ) : null}

          {config.tabs?.items.length ? (
            <section className="mt-12 lg:mt-14">
              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {config.tabs.title}
                </h2>

                <div className="mt-6">
                  <div
                    role="tablist"
                    aria-label={config.tabs.title}
                    className="flex gap-2 overflow-x-auto pb-2"
                  >
                    {config.tabs.items.map((item) => {
                      const isActive = item.id === activeTab?.id
                      const tabId = `${tabBaseId}-tab-${item.id}`
                      const panelId = `${tabBaseId}-panel-${item.id}`

                      return (
                        <button
                          key={item.id}
                          id={tabId}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          aria-controls={panelId}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setActiveTabId(item.id)}
                          className={[
                            'inline-flex flex-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
                            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,0,0.75)]',
                            isActive
                              ? 'border-[rgba(255,255,0,0.35)] bg-[rgba(255,255,0,0.12)] text-white'
                              : 'border-purple-500/30 bg-black/20 text-white/75 hover:text-white',
                          ].join(' ')}
                        >
                          {item.iconSvgSrc ? (
                            <img
                              src={item.iconSvgSrc}
                              alt=""
                              aria-hidden="true"
                              className="h-5 w-5"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>

                  {activeTab ? (
                    <div
                      id={`${tabBaseId}-panel-${activeTab.id}`}
                      role="tabpanel"
                      aria-labelledby={`${tabBaseId}-tab-${activeTab.id}`}
                      className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-6 sm:p-8"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        {activeTab.iconSvgSrc ? (
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                            <img
                              src={activeTab.iconSvgSrc}
                              alt=""
                              aria-hidden="true"
                              className="h-6 w-6"
                              loading="lazy"
                              decoding="async"
                            />
                          </span>
                        ) : null}
                        <h3 className="text-xl font-semibold">
                          {activeTab.title ?? activeTab.label}
                        </h3>
                      </div>

                      {activeTab.body ? (
                        <p className="mt-4 text-sm/7 text-white/75">
                          {activeTab.body}
                        </p>
                      ) : null}
                      {activeTab.bullets?.length ? (
                        <Bullets bullets={activeTab.bullets} />
                      ) : null}
                      {activeTab.note ? <Note>{activeTab.note}</Note> : null}
                    </div>
                  ) : null}
                </div>
              </Card>
            </section>
          ) : null}

          {config.pricing ? (
            <section className="mt-12 lg:mt-14">
              <Card className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {config.pricing.title}
                    </h2>
                    {config.pricing.subtitle ? (
                      <p className="mt-3 max-w-3xl text-sm/7 text-white/70">
                        {config.pricing.subtitle}
                      </p>
                    ) : null}
                  </div>

                  <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1">
                    {config.pricing.billingModes.map((mode) => {
                      const isActive = billingMode === mode.id
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setBillingMode(mode.id)}
                          className={[
                            'rounded-full px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition',
                            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,0,0.75)]',
                            isActive
                              ? 'bg-(--electrico) text-black'
                              : 'text-white/70 hover:text-white',
                          ].join(' ')}
                        >
                          {mode.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {config.pricing.plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="rounded-3xl border border-purple-500/30 bg-black/20 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:border-[rgba(255,255,0,0.30)]"
                    >
                      <p className="text-xs font-semibold tracking-[0.18em] text-white/60">
                        {plan.labelTop}
                      </p>
                      <p className="mt-2 text-xl font-semibold">{plan.name}</p>
                      <p className="mt-6 text-3xl font-semibold text-(--electrico)">
                        {plan.priceByMode[billingMode]}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          ) : null}

          {config.cta ? (
            <section className="mt-12 lg:mt-14">
              <Card className="overflow-hidden">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {config.cta.title}
                    </h2>
                    {config.cta.body ? (
                      <p className="mt-4 text-sm/7 text-white/75">
                        {config.cta.body}
                      </p>
                    ) : null}
                  </div>
                  <div className="lg:col-span-4 lg:text-right">
                    {config.cta.priceText ? (
                      <p className="text-4xl font-semibold text-(--electrico)">
                        {config.cta.priceText}
                      </p>
                    ) : null}
                    {config.cta.icons?.length ? (
                      <div
                        className="mt-6 flex flex-wrap gap-3 lg:justify-end"
                        aria-hidden="true"
                      >
                        {config.cta.icons.map((src) => (
                          <span
                            key={src}
                            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                          >
                            <img
                              src={src}
                              alt=""
                              className="h-6 w-6"
                              loading="lazy"
                              decoding="async"
                            />
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Card>
            </section>
          ) : null}
        </div>
      </div>
    </main>
  )
}
