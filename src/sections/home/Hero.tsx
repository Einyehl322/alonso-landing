import { useRef } from 'react'
import { media } from '../../data/media'
import { EASE, gsap, MQ, MQ_CONDITIONS, useGSAP } from '../../motion/gsap'
import { Link } from '../../router/Link'
import { Icon } from '../../components/ui/Icon'
import './hero.css'

/** La secuencia de entrada solo se reproduce en la primera visita de la sesión. */
let introPlayed = false

/**
 * Hero cinematográfico.
 * Secuencia: el encuadre se abre como un plano panorámico (entorno) → un haz de
 * luz recorre la escena y descubre el producto → titular por líneas → propuesta
 * de valor → acciones → indicador de scroll.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        if (introPlayed) return
        introPlayed = true
        const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } })
        tl.from('.hero__frame', { clipPath: 'inset(49% 0% 49% 0%)', duration: 1.6, ease: 'expo.inOut' })
          .from('.hero__media', { scale: 1.22, duration: 2.8 }, 0.2)
          .fromTo('.hero__shade', { opacity: 1 }, { opacity: 0, duration: 2.2, ease: 'power2.inOut' }, 0.5)
          .fromTo(
            '.hero__beam',
            { xPercent: -140, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1.8, ease: 'power3.inOut' },
            0.9,
          )
          .from('.hero__title .line-mask > span', { yPercent: 110, duration: 1.3, stagger: 0.12 }, 1.6)
          .from('.hero__eyebrow', { autoAlpha: 0, x: -16, duration: 1 }, 1.7)
          .from('.hero__lead', { autoAlpha: 0, y: 18, filter: 'blur(6px)', duration: 1.1 }, 2.05)
          .from('.hero__actions > *', { autoAlpha: 0, y: 14, scale: 0.96, duration: 0.9, stagger: 0.1 }, 2.3)
          .from('.hero__scroll', { autoAlpha: 0, duration: 1 }, 2.8)
      })

      // Salida al desplazarse: el producto avanza hacia la cámara y el texto se retira.
      mm.add(MQ_CONDITIONS.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
        tl.to('.hero__frame', { scale: 1.12, yPercent: 6, ease: 'none' }, 0)
          .to('.hero__content', { yPercent: -28, autoAlpha: 0, ease: 'none' }, 0)
          .to('.hero__dim', { opacity: 0.75, ease: 'none' }, 0)
      })

      mm.add(MQ_CONDITIONS.mobile, () => {
        gsap.to('.hero__frame', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="hero" data-scheme="dark" aria-labelledby="hero-title">
      <div className="hero__frame">
        <img
          className="hero__media"
          src={media.casco.src}
          srcSet={media.casco.srcSet}
          sizes="100vw"
          width={media.casco.width}
          height={media.casco.height}
          alt="Intercomunicador montado en el lateral de un casco de motocicleta, iluminado sobre fondo negro"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__beam" aria-hidden="true" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__dim" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />
      </div>

      <div className="hero__content container">
        <p className="eyebrow hero__eyebrow">SMART RIDE · Intercomunicadores · Pantallas CarPlay</p>
        <h1 id="hero-title" className="hero__title t-hero">
          <span className="line-mask">
            <span>La ruta,</span>
          </span>
          <span className="line-mask">
            <span>conectada.</span>
          </span>
        </h1>
        <p className="hero__lead t-lead">
          Tecnología para hablar con tu grupo, seguir tu ruta y disfrutar cada kilómetro sin soltar el manillar.
        </p>
        <div className="hero__actions">
          <Link to="#productos" className="btn btn--primary">
            Explorar productos
            <Icon name="arrow" />
          </Link>
          <Link to="#tecnologia" className="btn btn--ghost">
            Descubrir tecnología
          </Link>
        </div>
      </div>

      <Link to="#manifiesto" className="hero__scroll" aria-label="Continuar desplazándose">
        <span className="hero__scroll-line" aria-hidden="true" />
        <span className="hero__scroll-label">Desliza</span>
      </Link>
    </section>
  )
}
