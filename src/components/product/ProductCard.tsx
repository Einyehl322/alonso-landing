import { useRef, type MouseEvent, type PointerEvent } from 'react'
import { getCategory, productPath } from '../../data/catalog'
import type { Product } from '../../data/types'
import { gsap, MQ, useGSAP } from '../../motion/gsap'
import { playProductExit } from '../../motion/productTransition'
import { Link } from '../../router/Link'
import { useRouter } from '../../router/context'
import { Icon } from '../ui/Icon'
import { DemoBadge, Maybe } from '../ui/Placeholders'
import { ProductStage } from '../visuals/ProductStage'
import './product-card.css'

interface Props {
  product: Product
  /** Lado del escenario en escritorio (composición alterna). */
  align: 'start' | 'end'
}

/**
 * Presentación de un modelo dentro de una colección.
 * "Explorar" dispara la transición cinematográfica hacia la ficha.
 */
export function ProductCard({ product, align }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { nav } = useRouter()
  const href = productPath(product)
  const category = getCategory(product.category)

  useGSAP(
    () => {
      // Al volver desde la ficha, la tarjeta ya es el destino de la transición:
      // no debe re-animarse.
      if (nav.kind === 'pop') return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 78%' } })
        tl.fromTo(
          '.stage',
          { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' },
        )
          .from('.stage__visual', { yPercent: 14, scale: 1.1, duration: 1.6, ease: 'expo.out' }, 0.35)
          .from('.pcard__rule', { scaleX: 0, transformOrigin: '0 50%', duration: 1.1, ease: 'expo.inOut' }, 0.2)
          .from('.pcard__name .line-mask > span', { yPercent: 110, duration: 1, ease: 'expo.out' }, 0.45)
          .from('.pcard__reveal', { autoAlpha: 0, y: 16, stagger: 0.07, duration: 0.9 }, 0.6)
      })
    },
    { scope: ref },
  )

  // Inclinación sutil siguiendo el cursor (solo punteros finos).
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`)
    e.currentTarget.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`)
    e.currentTarget.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`)
    e.currentTarget.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`)
  }
  const onPointerLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }

  const exit = async (e: MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget.closest<HTMLElement>('[data-product-card]')
    const tilt = card?.querySelector<HTMLElement>('.pcard__tilt')
    tilt?.style.setProperty('--rx', '0deg')
    tilt?.style.setProperty('--ry', '0deg')
    if (card) await playProductExit(card)
  }

  return (
    <article ref={ref} className={`pcard pcard--${align}`} data-product-card aria-labelledby={`pcard-${product.slug}`}>
      <Link
        to={href}
        beforeNavigate={exit}
        className="pcard__tilt"
        tabIndex={-1}
        aria-hidden="true"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <ProductStage product={product} variant="card" shared sizes="(min-width: 900px) 58vw, 92vw">
          <span className="pcard__sheen" aria-hidden="true" />
        </ProductStage>
      </Link>

      <div className="pcard__copy">
        <div className="pcard__meta" data-card-text>
          <span className="eyebrow">{category.name}</span>
          {product.isDemo ? <DemoBadge /> : null}
        </div>
        <div className="pcard__rule" aria-hidden="true" />
        <h3 id={`pcard-${product.slug}`} className="pcard__name t-h2" data-card-text>
          <span className="line-mask">
            <span>{product.name}</span>
          </span>
        </h3>
        <p className="pcard__tagline t-lead pcard__reveal" data-card-text>
          {product.tagline}
        </p>
        <dl className="pcard__commerce pcard__reveal" data-card-text>
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
        </dl>
        <div className="pcard__actions pcard__reveal" data-card-text>
          <Link to={href} beforeNavigate={exit} className="btn btn--primary" aria-label={`Explorar ${product.name}`}>
            Explorar
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </article>
  )
}
