import { useRef } from 'react'
import { Maybe } from '../../components/ui/Placeholders'
import type { Product } from '../../data/types'
import { gsap, MQ, useGSAP } from '../../motion/gsap'
import './product.css'

/** Beneficios para el comprador: filas editoriales que se trazan de izquierda a derecha. */
export function ProductBenefits({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>('.benefit').forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%' } })
          tl.from(row, { '--rule': 0, duration: 1.2, ease: 'expo.inOut' })
            .from(row.querySelector('.benefit__index'), { autoAlpha: 0, x: -20, duration: 0.8 }, 0.2)
            .from(row.querySelectorAll('.benefit__title, .benefit__body'), { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.9 }, 0.3)
        })
      })
    },
    { scope: ref, dependencies: [product.slug], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="pbenefits section" data-scheme={product.theme.scheme} aria-labelledby="pbenefits-title">
      <div className="container">
        <p className="eyebrow">Beneficios</p>
        <h2 id="pbenefits-title" className="t-h2 pbenefits__title">
          Lo que cambia en cada viaje.
        </h2>
        <ol className="pbenefits__list">
          {product.benefits.map((b, i) => (
            <li key={i} className="benefit">
              <span className="benefit__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="benefit__title t-h3">
                <Maybe value={b.title} />
              </h3>
              <p className="benefit__body t-muted">
                <Maybe value={b.body} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
