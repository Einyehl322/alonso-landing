import { useRef } from 'react'
import { ProductCollection } from '../components/product/ProductCollection'
import { ProductCompare } from '../components/product/ProductCompare'
import { Icon } from '../components/ui/Icon'
import { ProductVisual } from '../components/visuals/ProductVisual'
import { categories, categoryPath } from '../data/catalog'
import type { Category } from '../data/types'
import { EASE, gsap, MQ, useGSAP } from '../motion/gsap'
import { Link } from '../router/Link'
import { usePageMeta } from '../router/usePageMeta'
import './pages.css'

export function CategoryPage({ category }: { category: Category }) {
  const ref = useRef<HTMLElement>(null)
  const scheme = category.id === 'carplay' ? 'light' : 'dark'
  const other = categories.find((c) => c.id !== category.id)!
  usePageMeta(category.name, category.lede)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // Entrada: el visual se "enfoca" mientras los textos se apilan.
        const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } })
        tl.from('.chero__visual', { scale: 1.15, autoAlpha: 0, filter: 'blur(16px)', duration: 1.8, clearProps: 'filter' }, 0.1)
          .from('.chero__title .line-mask > span', { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.3)
          .from('.chero__copy > :not(h1)', { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.55)
        gsap.to('.chero__visual', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref, dependencies: [category.id], revertOnUpdate: true },
  )

  return (
    <>
      <section ref={ref} className="chero" data-scheme={scheme} aria-labelledby="chero-title">
        <div className="container chero__layout">
          <div className="chero__copy">
            <nav className="phero__crumbs" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{category.name}</span>
            </nav>
            <p className="eyebrow">{category.eyebrow}</p>
            <h1 id="chero-title" className="chero__title t-display">
              <span className="line-mask">
                <span>{category.name}</span>
              </span>
            </h1>
            <p className="t-lead">{category.lede}</p>
            <ul className="chero__beats">
              {category.beats.map((b) => (
                <li key={b.title}>
                  <strong>{b.title}</strong>
                  <span className="t-muted">{b.body}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="chero__stage">
            <ProductVisual
              visual={category.visual}
              priority
              className="chero__visual"
              sizes="(min-width: 900px) 50vw, 92vw"
              spin={category.id === 'intercomunicadores'}
            />
          </div>
        </div>
      </section>

      <ProductCollection category={category.id} scheme={scheme} title={`Modelos de ${category.name.toLowerCase()}`} />
      <ProductCompare category={category.id} />

      <section className="cross section" data-scheme="dark" aria-label={`Ver ${other.name}`}>
        <div className="container">
          <Link to={categoryPath(other.id)} className="cross__link">
            <span className="eyebrow">También te puede interesar</span>
            <span className="cross__title t-display">{other.name}</span>
            <span className="text-link">
              <span>{other.eyebrow}</span>
              <Icon name="arrow" />
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
