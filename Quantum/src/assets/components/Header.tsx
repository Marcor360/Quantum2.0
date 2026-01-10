import { useEffect, useRef, useState } from 'react'
import './Header.css'

type NavItem = {
  label: string
  href: string
}

type ServiceItem = {
  label: string
  href: string
}

type Lang = 'es' | 'en'

const I18N = {
  es: {
    navLabel: 'Navegación principal',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    langLabel: 'Idioma',
    servicesLabel: 'Servicios',
    services: [
      { label: 'Branding', href: '/servicios/branding' },
      { label: 'E-commerce', href: '/servicios/e-commerce' },
      { label: 'Apps & I.A.', href: '/servicios/apps-ia' },
      { label: 'Campanas', href: '/servicios/campanas' },
    ] satisfies ServiceItem[],
    links: [
      { label: 'Quantum 360°', href: '#quantum360' },
      { label: 'Proyectos', href: '#proyectos' },
      { label: 'Contáctanos', href: '#contacto' },
    ] satisfies NavItem[],
  },
  en: {
    navLabel: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langLabel: 'Language',
    servicesLabel: 'Services',
    services: [
      { label: 'Branding', href: '/servicios/branding' },
      { label: 'E-commerce', href: '/servicios/e-commerce' },
      { label: 'Apps & A.I.', href: '/servicios/apps-ia' },
      { label: 'Campaigns', href: '/servicios/campanas' },
    ] satisfies ServiceItem[],
    links: [
      { label: 'Quantum 360°', href: '#quantum360' },
      { label: 'Projects', href: '#proyectos' },
      { label: 'Contact', href: '#contacto' },
    ] satisfies NavItem[],
  },
} as const satisfies Record<
  Lang,
  {
    navLabel: string
    openMenu: string
    closeMenu: string
    langLabel: string
    servicesLabel: string
    services: ServiceItem[]
    links: NavItem[]
  }
>

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }

    mql.addListener(onChange)
    return () => mql.removeListener(onChange)
  }, [query])

  return matches
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'es'

    try {
      const stored = localStorage.getItem('lang')
      if (stored === 'es' || stored === 'en') return stored
    } catch {
      // ignore
    }

    return 'es'
  })
  const railRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const [servicesOpen, setServicesOpen] = useState(isMobile)
  const wasMobileRef = useRef(isMobile)
  const navId = 'site-navigation'
  const content = I18N[lang]

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // ignore
    }

    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (typeof window === 'undefined' || !isOpen) return

    const w = window as Window & typeof globalThis

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    function handlePointerOutside(event: Event) {
      const rail = railRef.current
      if (rail && !rail.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    w.addEventListener('keydown', handleKeyDown)

    w.addEventListener('pointerdown', handlePointerOutside)

    return () => {
      w.removeEventListener('keydown', handleKeyDown)
      w.removeEventListener('pointerdown', handlePointerOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (wasMobileRef.current && !isMobile && isOpen) {
      setIsOpen(false)
    }
    wasMobileRef.current = isMobile
  }, [isMobile, isOpen])

  useEffect(() => {
    if (isMobile) {
      setServicesOpen(true)
    } else {
      setServicesOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile && !isOpen && servicesOpen) {
      setServicesOpen(false)
    }
  }, [isMobile, isOpen, servicesOpen])

  useEffect(() => {
    if (isMobile && isOpen) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [isMobile, isOpen])

  return (
    <header className="site-header">
      {isOpen && isMobile && (
        <div
          className="site-header__backdrop is-open"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        ref={railRef}
        className={`site-header__rail ${isOpen ? 'is-open' : ''}`}
      >
        <nav
          className="site-header__nav"
          id={navId}
          aria-label={content.navLabel}
          data-open={isOpen}
        >
          <div className="site-header__links">
            <div className={`site-header__services ${servicesOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="site-header__services-toggle"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((prev) => !prev)}
              >
                {content.servicesLabel}
                <span className="site-header__services-caret" aria-hidden="true" />
              </button>
              <div
                className="site-header__services-menu"
                role="menu"
                aria-hidden={!servicesOpen}
              >
                {content.services.map((service) => (
                  <a
                    key={service.label}
                    href={service.href}
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                  >
                    {service.label}
                  </a>
                ))}
              </div>
            </div>
            {content.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="site-header__lang" role="group" aria-label={content.langLabel}>
            <button
              type="button"
              className={`site-header__lang-btn ${lang === 'es' ? 'is-active' : ''}`}
              aria-pressed={lang === 'es'}
              onClick={() => setLang('es')}
            >
              ES
            </button>
            <button
              type="button"
              className={`site-header__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-label={isOpen ? content.closeMenu : content.openMenu}
          aria-expanded={isOpen}
          aria-controls={navId}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src="/svg/Menu.svg" alt="" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
