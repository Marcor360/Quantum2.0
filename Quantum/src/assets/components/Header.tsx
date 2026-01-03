import { useEffect, useRef, useState } from 'react'
import './Header.css'

type NavItem = {
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
    links: [
      { label: 'Servicios', href: '#servicios' },
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
    links: [
      { label: 'Services', href: '#servicios' },
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
  const isMobile = useMediaQuery('(max-width: 768px)')
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
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    function handleClickOutside(event: MouseEvent) {
      const rail = railRef.current
      if (rail && !rail.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
