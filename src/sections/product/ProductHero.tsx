import { useRef } from 'react'
import { ContactActions } from '../../components/ui/ContactActions'
import { Icon } from '../../components/ui/Icon'
import { DemoBadge, Maybe } from '../../components/ui/Placeholders'
import { View360Button } from '../../components/viewer360/View360Button'
import { ProductStage } from '../../components/visuals/ProductStage'
import { categoryPath, getCategory } from '../../data/catalog'
import type { Product } from '../../data/types'
import { EASE, gsap, MQ, MQ_CONDITIONS, useGSAP } from '../../motion/gsap'
import { Link } from '../../router/Link'
import { useRouter } from '../../router/context'
import './product.css'

/**
 * Hero de la ficha. Es el destino de la transición compartida:
 * - Si llegamos con View Transition, el producto ya viajó hasta aquí y solo
 *   entran nombre, descripción y acciones (fase 3).
 * - En enlaces directos o sin soporte, el hero hace su propia entrada.
 */
export function ProductHero({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null)
  const { nav } = useRouter()
  const category = getCategory(product.category)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } })
        if (!nav.shared) {
          tl.from('.stage__light', { opacity: 0, duration: 1.8, ease: 'power2.inOut' }, 0)
            .from(
              '.stage__visual',
              { scale: 0.86, autoAlpha: 0, filter: 'blur(14px)', duration: 1.8, clearProps: 'filter' },
              0.15,
            )
        }
        const t0 = nav.shared ? 0.5 : 0.7
        tl.from('.phero__crumbs, .phero__meta', { autoAlpha: 0, y: 12, duration: 0.9, stagger: 0.08 }, t0)
          .from('.phero__name .line-mask > span', { yPercent: 110, duration: 1.2 }, t0 + 0.05)
          .from('.phero__tagline', { autoAlpha: 0, y: 18, duration: 1 }, t0 + 0.25)
          .from('.phero__commerce > *', { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.06 }, t0 + 0.4)
          .from('.phero__actions .btn, .phero__actions .v360-pending', { autoAlpha: 0, y: 12, scale: 0.97, duration: 0.8, stagger: 0.08 }, t0 + 0.5)
      })

      // Salida: el producto avanza hacia la cámara.
      mm.add(MQ_CONDITIONS.desktop, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 } })
          .to('.stage__visual', { scale: 1.12, yPercent: 8, ease: 'none' }, 0)
          .to('.phero__content', { yPercent: -18, autoAlpha: 0, ease: 'none' }, 0)
      })
    },
    { scope: ref, dependencies: [product.slug], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="phero" data-scheme={product.theme.scheme} aria-labelledby="product-title">
      <ProductStage
        product={product}
        variant="hero"
        shared
        priority
        sizes="(min-width: 900px) 60vw, 100vw"
        spin={product.category === 'intercomunicadores'}
      />

      <div className="phero__content container">
        <nav className="phero__crumbs" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to={categoryPath(category.id)}>{category.name}</Link>
        </nav>
        <div className="phero__meta">
          <span className="eyebrow">{category.eyebrow}</span>
          {product.isDemo ? <DemoBadge /> : null}
        </div>
        <h1 id="product-title" className="phero__name t-hero">
          <span className="line-mask">
            <span>{product.name}</span>
          </span>
        </h1>
        <p className="phero__tagline t-lead">{product.tagline}</p>

        <dl className="phero__commerce">
          <div>
            <dt>Precio</dt>
            <dd>
              <Maybe value={product.commerce.price} />
            </dd>
          </div>
          <div>
            <dt>Disponibilidad</dt>
            <dd>
              <Maybe value={product.commerce.availability} />
            </dd>
          </div>
          {product.commerce.promotion ? (
            <div>
              <dt>Promoción</dt>
              <dd>{product.commerce.promotion}</dd>
            </div>
          ) : null}
        </dl>

        <div className="phero__actions">
          <ContactActions product={product} withBuy />
          <View360Button product={product} />
          <Link to="#resumen" className="btn btn--ghost">
            Ver características
            <Icon name="arrow-down" />
          </Link>
        </div>
      </div>
    </section>
  )
}
