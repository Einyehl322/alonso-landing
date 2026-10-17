import { useEffect, useRef, useState } from 'react'
import { categories, categoryPath, getProducts, productPath } from '../../data/catalog'
import { gsap, prefersReducedMotion } from '../../motion/gsap'
import { Link } from '../../router/Link'
import { Icon } from '../ui/Icon'
import { Brand } from './Brand'
import './layout.css'

const NAV = [
  ...categories.map((c) => ({ label: c.name, to: categoryPath(c.id) })),
  { label: 'Tecnología', to: '/#tecnologia' },
  { label: 'Contacto', to: '#contacto' },
]

/**
 * Cabecera global. Transparente sobre el hero; vidrio oscuro al desplazarse.
 * Permanece fija durante el scroll; en móvil mantiene a la vista el acceso a CarPlay.
 */
export function Header({ scheme }: { scheme: 'dark' | 'light' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menú móvil: coreografía de entrada, Escape para cerrar, bloqueo de scroll.
  useEffect(() => {
    if (!open) return
    const menu = menuRef.current
    document.body.style.overflow = 'hidden'
    if (menu && !prefersReducedMotion()) {
      gsap.fromTo(
        menu.querySelectorAll('[data-menu-item]'),
        { yPercent: 60, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.05, ease: 'expo.out', delay: 0.05 },
      )
    }
    menu?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`site-header ${scrolled || open ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}
      data-scheme={scrolled || open ? 'dark' : scheme}
    >
      <div className="site-header__bar container">
        <Brand onNavigate={close} />
        <nav className="site-nav" aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="site-nav__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to={categoryPath('carplay')} className="site-header__quick" onClick={close}>
          CarPlay
        </Link>
        <Link to="#contacto" className="btn btn--primary btn--sm site-header__cta">
          Consultar
        </Link>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className="menu-toggle__icon" />
        </button>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Menú móvil" className="container">
          {categories.map((c) => (
            <div key={c.id} className="mobile-menu__group">
              <div data-menu-item>
                <Link to={categoryPath(c.id)} className="mobile-menu__primary" onClick={close}>
                  {c.name}
                </Link>
              </div>
              <ul>
                {getProducts(c.id).map((p) => (
                  <li key={p.slug} data-menu-item>
                    <Link to={productPath(p)} onClick={close}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mobile-menu__secondary" data-menu-item>
            <Link to="/#tecnologia" onClick={close}>
              Tecnología
            </Link>
            <Link to="#contacto" onClick={close}>
              Contacto
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
