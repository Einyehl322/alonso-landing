import { useRef } from 'react'
import { ProductVisual } from '../../components/visuals/ProductVisual'
import { Icon } from '../../components/ui/Icon'
import { categories, categoryPath, getProducts } from '../../data/catalog'
import { gsap, MQ, MQ_CONDITIONS, useGSAP } from '../../motion/gsap'
import { Link } from '../../router/Link'
import './home.css'

/**
 * Acceso directo a los dos universos. En escritorio, el panel bajo el cursor
 * gana protagonismo y el otro cede espacio.
 */
export function CategoryChooser() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.chooser__grid', start: 'top 75%' } })
        tl.fromTo(
          '.chooser__panel',
          { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.4, stagger: 0.15, ease: 'expo.inOut' },
        ).from(
          '.chooser__visual',
          { yPercent: 18, scale: 1.12, duration: 1.6, stagger: 0.15, ease: 'expo.out' },
          0.35,
        )
        tl.from('.chooser__head > *', { autoAlpha: 0, y: 20, stagger: 0.08, duration: 1 }, 0)
      })
      mm.add(MQ_CONDITIONS.desktop, () => {
        gsap.to('.chooser__visual', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: '.chooser__grid', start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="productos" className="chooser section" data-scheme="dark" aria-labelledby="chooser-title">
      <div className="container">
        <div className="chooser__head" data-fade-on-enter>
          <p className="eyebrow">Productos</p>
          <h2 id="chooser-title" className="t-h2">
            Dos formas de viajar mejor.
          </h2>
        </div>
        <div className="chooser__grid">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              to={categoryPath(c.id)}
              className={`chooser__panel chooser__panel--${i === 0 ? 'dark' : 'light'}`}
              data-scheme={i === 0 ? 'dark' : 'light'}
              data-fade-on-enter
            >
              <div className="chooser__copy">
                <p className="eyebrow">{c.eyebrow}</p>
                <h3 className="t-h3">{c.name}</h3>
                <p className="chooser__count t-muted">
                  {getProducts(c.id).length} modelos
                </p>
              </div>
              <ProductVisual
                visual={c.visual}
                className="chooser__visual"
                sizes="(min-width: 900px) 40vw, 90vw"
                spin={c.id === 'intercomunicadores'}
              />
              <span className="chooser__cta">
                Ver {c.name.toLowerCase()}
                <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
