import { type ReactNode, useId, useMemo, useState } from 'react'
import Header from '../../assets/components/Header'
import PricingSection, { type PricingSectionConfig } from './PricingSection'

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
  sectionsLayout?: 'grid' | 'stack'
  sections?: Array<{
    id: string
    title: string
    body?: string
    bullets?: string[]
    note?: string
    fullWidth?: boolean
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
  pricing?: PricingSectionConfig
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
        'rounded-3xl',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function SectionCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-2xl p-6',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function Bullets({ bullets }: { bullets: string[] }) {
  const items = bullets.filter((bullet) => bullet.trim().length > 0)

  if (!items.length) return null

  return (
    <ul className="mt-4 list-disc space-y-3 pl-5 text-lg leading-relaxed text-zinc-200/90 marker:text-lime-300 md:text-xl">
      {items.map((bullet, index) => (
        <li key={`${index}-${bullet}`}>{bullet}</li>
      ))}
    </ul>
  )
}

function Note({ children }: { children: string }) {
  return (
    <p className="mt-4 text-base leading-relaxed text-zinc-200/90 md:text-lg">
      <span className="font-semibold text-white">Nota:</span> {children}
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

  const sectionsLayout = config.sectionsLayout ?? 'stack'

  return (
    <main className="relative min-h-screen overflow-hidden bg-(--mate) text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative z-10">
        <Header />

        <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
          <section
            aria-label={config.title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <h1 className="sr-only">{config.title}</h1>
            <img
              src={config.titleSvgSrc}
              alt=""
              aria-hidden="true"
              className="h-24 w-auto max-w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:h-3=48 md:h-62"
              decoding="async"
              loading="lazy"
            />
            {config.hero?.subtitle && (
              <p className="max-w-2xl text-balance text-lg text-zinc-300 md:text-xl">
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
                            Placeholder - aqui ira el video
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
                    <p className="mt-5 text-lg/8 text-white/75 md:text-xl/9">
                      {config.intro.body}
                    </p>
                  )}
                </Card>
              </div>
            </section>
          )}

          {config.sections?.length ? (
            <section className="mt-10 md:mt-12">
              <div
                className={
                  sectionsLayout === 'grid'
                    ? 'grid gap-6 md:grid-cols-2'
                    : 'space-y-6'
                }
              >
                {config.sections.map((section) => {
                  const bullets = section.bullets?.filter(
                    (item) => item.trim().length > 0
                  )
                  const isFullWidth =
                    sectionsLayout === 'grid' && section.fullWidth

                  return (
                    <SectionCard
                      key={section.id}
                      className={isFullWidth ? 'md:col-span-2' : ''}
                    >
                      <div id={section.id} className="scroll-mt-28">
                        <h2 className="text-3xl font-semibold text-white md:text-4xl">
                          {section.title}
                        </h2>
                        {section.body && (
                          <p className="mt-3 text-lg leading-relaxed text-zinc-200/90 md:text-xl">
                            {section.body}
                          </p>
                        )}
                        {bullets?.length ? <Bullets bullets={bullets} /> : null}
                        {section.note ? <Note>{section.note}</Note> : null}
                      </div>
                    </SectionCard>
                  )
                })}
              </div>
            </section>
          ) : null}

          {config.tabs?.items.length ? (
            <section className="mt-12 lg:mt-14">
              <Card className="p-6 sm:p-8">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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
                            'inline-flex flex-none items-center gap-2 rounded-full border px-4 py-2 text-lg font-medium transition',
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
                      className="mt-6 rounded-3xl p-6 sm:p-8"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        {activeTab.iconSvgSrc ? (
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl">
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
                        <h3 className="text-3xl font-semibold md:text-4xl">
                          {activeTab.title ?? activeTab.label}
                        </h3>
                      </div>

                      {activeTab.body ? (
                        <p className="mt-4 text-lg/8 text-white/75 md:text-xl/9">
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
              <PricingSection config={config.pricing} />
            </section>
          ) : null}

          {config.cta ? (
            <section className="mt-12 lg:mt-14">
              <Card className="overflow-hidden">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      {config.cta.title}
                    </h2>
                    {config.cta.body ? (
                      <p className="mt-4 text-lg/8 text-white/75 md:text-xl/9">
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
                            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
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
