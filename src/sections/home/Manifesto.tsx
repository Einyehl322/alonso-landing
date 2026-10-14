import { useRef } from 'react'
import { gsap, MQ, useGSAP } from '../../motion/gsap'
import './home.css'

const TEXT =
  'Hablar con tu grupo. Ver tu ruta. Escuchar tu música. Todo mientras el camino sigue frente a ti, sin distracciones.'

/**
 * Manifiesto: las palabras se "encienden" una a una al ritmo del scroll,
 * como si la lectura avanzara con la moto.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const words = TEXT.split(' ')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.manifesto__word',
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: '.manifesto__text', start: 'top 80%', end: 'bottom 45%', scrub: 0.4 },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="manifiesto" className="manifesto section" data-scheme="dark" aria-label="Manifiesto">
      <div className="container">
        <p className="eyebrow">Por qué existimos</p>
        <p className="manifesto__text t-h2">
          {words.map((w, i) => (
            <span key={i} className="manifesto__word">
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
