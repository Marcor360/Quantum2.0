import { useEffect, useMemo, useState } from 'react'
import './Header.css'

type NavItem = {
  label: string
  href: string
}

const DEFAULT_LINKS: NavItem[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Quantum 360°', href: '#quantum360' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contáctanos', href: '#contacto' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navLinks = useMemo(() => DEFAULT_LINKS, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="site-header">
      <div className={`site-header__rail ${isOpen ? 'is-open' : ''}`}>
        <a className="site-header__logo" href="/" aria-label="Quantum inicio">
          <img
            src="/svg/Logo-text.svg"
            alt="Quantum"
            width="148"
            height="28"
            loading="lazy"
          />
        </a>

        <nav
          className="site-header__nav"
          aria-label="Navegación principal"
          data-open={isOpen}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="site-header__toggle"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src="/svg/Menu.svg" alt="" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
