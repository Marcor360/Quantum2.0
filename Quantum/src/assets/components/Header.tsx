import { useState } from 'react'
import './Header.css'

type NavItem = {
  label: string
  href: string
}

const DEFAULT_LINKS: NavItem[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Quantum 360\u00B0', href: '#quantum360' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Cont\u00E1ctanos', href: '#contacto' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navLinks = DEFAULT_LINKS
  const navId = 'site-navigation'

  return (
    <header className="site-header">
      <div className={`site-header__rail ${isOpen ? 'is-open' : ''}`}>
        <a className="site-header__logo" href="/" aria-label="Quantum inicio">
          <img
            src="/svg/Logo-Amarillo.svg"
            alt="Quantum"
            width="148"
            height="28"
            loading="lazy"
          />
        </a>

        <nav
          className="site-header__nav"
          id={navId}
          aria-label="Navegacion principal"
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
          aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
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
