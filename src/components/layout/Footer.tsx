import { useRef } from 'react'
import { site } from '../../config/site'
import { categories, categoryPath, getProducts, productPath } from '../../data/catalog'
import type { Product } from '../../data/types'
import { gsap, MQ, useGSAP } from '../../motion/gsap'
import { Link } from '../../router/Link'
import { ContactActions } from '../ui/ContactActions'
import { Pending } from '../ui/Placeholders'
import { BrandMark } from './Brand'

const YEAR = new Date().getFullYear()

/** Contacto (ancla #contacto, presente en todas las páginas) + pie. */
export function Footer({ product }: { product?: Product }) {
  const ref = useRef<HTMLElement>(null)
  const { contact } = site

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // Titular que se "enciende" de izquierda a derecha.
        gsap.from('.contact__title .line-mask > span', {
          yPercent: 105,
          duration: 1.1,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.contact', start: 'top 70%' },
        })
        gsap.from('.contact__rule', {
          scaleX: 0,
          transformOrigin: '0 50%',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: '.contact', start: 'top 70%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <footer ref={ref} className="site-footer" data-scheme="dark">
      <section id="contacto" className="contact container" aria-labelledby="contact-title">
        <p className="eyebrow">Contacto</p>
        <h2 id="contact-title" className="contact__title t-display">
          <span className="line-mask">
            <span>¿Listo para tu</span>
          </span>
          <span className="line-mask">
            <span>próxima ruta?</span>
          </span>
        </h2>
        <div className="contact__rule" aria-hidden="true" />
        <div className="contact__grid">
          <div>
            <p className="t-lead">
              {product
                ? `Consúltanos precio, disponibilidad y compatibilidad de ${product.name}.`
                : 'Cuéntanos qué moto tienes y cómo viajas. Te ayudamos a elegir el equipo adecuado.'}
            </p>
            <ContactActions product={product} className="contact__actions" />
          </div>
          <dl className="contact__data">
            <div>
              <dt>Correo</dt>
              <dd>{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <Pending />}</dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>{contact.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : <Pending />}</dd>
            </div>
            <div>
              <dt>Dirección</dt>
              <dd>{contact.address ? <span>{contact.address}</span> : <Pending />}</dd>
            </div>
            <div>
              <dt>Horario</dt>
              <dd>{contact.hours ? <span>{contact.hours}</span> : <Pending />}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="footer-bottom container">
        <div className="footer-bottom__brand">
          <BrandMark className="brand__mark" />
          <div>
            <strong>{site.brand.name}</strong>
            <p className="t-muted">{site.brand.descriptor}</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Pie de página">
          {categories.map((c) => (
            <div key={c.id}>
              <Link to={categoryPath(c.id)} className="footer-nav__title">
                {c.name}
              </Link>
              <ul>
                {getProducts(c.id).map((p) => (
                  <li key={p.slug}>
                    <Link to={productPath(p)}>{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer-legal">
          {site.demoMode ? (
            <p>
              Sitio en desarrollo. Los modelos, imágenes y textos marcados como demostrativos son provisionales y no
              representan productos disponibles para la venta.
            </p>
          ) : null}
          <p>
            © {YEAR} {site.brand.legalName}
          </p>
        </div>
      </div>
    </footer>
  )
}
