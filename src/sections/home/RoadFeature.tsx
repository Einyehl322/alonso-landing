import { useRef } from 'react'
import { media } from '../../data/media'
import { gsap, MQ, useGSAP } from '../../motion/gsap'
import './home.css'

/**
 * Fotografía de ruta a sangre completa con parallax: la imagen se desplaza más
 * despacio que la página y el titular emerge al entrar en pantalla.
 */
export function RoadFeature() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.road__img',
          { yPercent: -9 },
          {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
        gsap.to('.road__content', {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 55%' } })
        tl.from('.road__title .line-mask > span', { yPercent: 110, stagger: 0.12, duration: 1.2, ease: 'expo.out' })
          .from('.road__note', { autoAlpha: 0, y: 16, duration: 1 }, 0.35)
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="road" data-scheme="dark" aria-labelledby="road-title">
      <div className="road__window">
        <img
          className="road__img"
          src={media.ruta.src}
          srcSet={media.ruta.srcSet}
          sizes="100vw"
          width={media.ruta.width}
          height={media.ruta.height}
          alt="Motociclista tomando una curva en una carretera de montaña rodeada de bosque"
          loading="lazy"
          decoding="async"
        />
        <div className="road__veil" aria-hidden="true" />
      </div>
      <div className="road__content container">
        <h2 id="road-title" className="road__title t-display">
          <span className="line-mask">
            <span>Pensado para</span>
          </span>
          <span className="line-mask">
            <span>quienes viven la ruta.</span>
          </span>
        </h2>
        <p className="road__note t-lead">
          Cada equipo que presentamos se elige pensando en el viaje: la comunicación, la orientación y la comodidad
          de quien conduce.
        </p>
      </div>
    </section>
  )
}
