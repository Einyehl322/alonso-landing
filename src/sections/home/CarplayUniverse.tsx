import { useRef } from 'react'
import { ProductVisual } from '../../components/visuals/ProductVisual'
import { getCategory } from '../../data/catalog'
import { EASE, focusToTransform, gsap, MQ, MQ_CONDITIONS, useGSAP } from '../../motion/gsap'
import './home.css'

/**
 * Universo CarPlay — lenguaje propio: fondo claro, pantalla fija lateral y una
 * ruta que se dibuja en el mapa conforme avanza la lectura.
 */
export function CarplayUniverse() {
  const ref = useRef<HTMLElement>(null)
  const camera = useRef<HTMLDivElement>(null)
  const category = getCategory('carplay')
  const { beats } = category

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // La "cortina" oscura se retira: el fondo evoluciona de grafito a blanco cálido.
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.universe__curtain',
          { scaleY: 1 },
          {
            scaleY: 0,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 20%', scrub: true },
          },
        )
        gsap.fromTo(
          '.dr-route',
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.carplay__beats', start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
          },
        )
      })

      mm.add(MQ_CONDITIONS.desktop, () => {
        const items = gsap.utils.toArray<HTMLElement>('.carplay__beat')
        gsap.set(camera.current, focusToTransform(beats[0].focus))
        items.forEach((el, i) => {
          gsap.from(el.querySelectorAll('h3, p'), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1,
            scrollTrigger: { trigger: el, start: 'top 70%' },
          })
          // Cada momento mueve la cámara sobre la pantalla.
          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 55%',
              end: 'bottom 55%',
              toggleClass: { targets: el, className: 'is-active' },
              onEnter: () => gsap.to(camera.current, { ...focusToTransform(beats[i].focus), duration: 1.2, ease: EASE.camera, overwrite: true }),
              onEnterBack: () => gsap.to(camera.current, { ...focusToTransform(beats[i].focus), duration: 1.2, ease: EASE.camera, overwrite: true }),
            },
          })
        })
        gsap.from('.carplay__device', {
          xPercent: 12,
          rotate: 3,
          autoAlpha: 0,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.carplay__layout', start: 'top 65%' },
        })
      })

      mm.add(MQ_CONDITIONS.mobile, () => {
        gsap.utils.toArray<HTMLElement>('.carplay__beat').forEach((el) => {
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: el, start: 'top 85%' } })
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="universe universe--carplay" data-scheme="light" aria-labelledby="u-carplay">
      <div className="universe__curtain" aria-hidden="true" />
      <div className="container carplay__intro">
        <p className="eyebrow">{category.eyebrow}</p>
        <h2 id="u-carplay" className="t-display carplay__title">
          {category.headline}
        </h2>
        <p className="t-lead carplay__lede">{category.lede}</p>
      </div>

      <div className="container carplay__layout">
        <ol className="carplay__beats">
          {beats.map((b, i) => (
            <li key={b.title} className={`carplay__beat ${i === 0 ? 'is-active' : ''}`}>
              <span className="beat__index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-h2">{b.title}</h3>
              <p className="t-lead">{b.body}</p>
            </li>
          ))}
        </ol>
        <div className="carplay__sticky">
          <div className="carplay__device">
            <ProductVisual visual={category.visual} cameraRef={camera} />
          </div>
          <p className="carplay__caption t-muted">Render ilustrativo · interfaz de ejemplo</p>
        </div>
      </div>
    </section>
  )
}
