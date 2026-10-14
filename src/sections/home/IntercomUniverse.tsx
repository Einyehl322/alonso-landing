import { useRef } from 'react'
import { ProductVisual } from '../../components/visuals/ProductVisual'
import { getCategory } from '../../data/catalog'
import { EASE, focusToTransform, gsap, MQ_CONDITIONS, useGSAP } from '../../motion/gsap'
import './home.css'

/**
 * Universo Intercomunicadores — sección fijada (pin) en escritorio.
 * La cámara recorre el producto mientras los tres momentos se relevan en el
 * mismo lugar; las ondas de señal acompañan la idea de comunicación.
 */
export function IntercomUniverse() {
  const ref = useRef<HTMLElement>(null)
  const camera = useRef<HTMLDivElement>(null)
  const category = getCategory('intercomunicadores')
  const { beats } = category

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ_CONDITIONS.desktop, () => {
        const items = gsap.utils.toArray<HTMLElement>('.beat')
        const ticks = gsap.utils.toArray<HTMLElement>('.universe__tick-fill')
        gsap.set(camera.current, focusToTransform(beats[0].focus))
        gsap.set(items.slice(1), { autoAlpha: 0, y: 40 })

        const tl = gsap.timeline({
          defaults: { ease: EASE.camera },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: `+=${beats.length * 90}%`,
            scrub: 0.8,
            pin: '.universe__pin',
            snap: { snapTo: 'labels', duration: { min: 0.3, max: 0.9 }, ease: 'power2.inOut' },
          },
        })

        tl.addLabel('beat-0')
          .fromTo(ticks[0], { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0)
          .fromTo('.universe__rings', { scale: 0.85 }, { scale: 1, duration: 1, ease: 'none' }, 0)

        beats.slice(1).forEach((beat, i) => {
          const at = (i + 1) * 1.2
          tl.to(items[i], { autoAlpha: 0, y: -40, filter: 'blur(8px)', duration: 0.5 }, at)
            .to(items[i + 1], { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.3)
            .to(camera.current, { ...focusToTransform(beat.focus), duration: 1 }, at)
            .to('.universe__rings', { scale: 1 + (i + 1) * 0.18, opacity: 0.4 - i * 0.12, duration: 1 }, at)
            .addLabel(`beat-${i + 1}`, at + 0.9)
            .fromTo(ticks[i + 1], { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, at)
        })
        tl.to({}, { duration: 0.4 })
      })

      mm.add(MQ_CONDITIONS.mobile, () => {
        gsap.utils.toArray<HTMLElement>('.beat').forEach((el) => {
          gsap.from(el, {
            clipPath: 'inset(0% 100% 0% 0%)',
            duration: 1.2,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })
        gsap.from('.universe__stage .pv', {
          scale: 0.8,
          rotate: -6,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.universe__stage', start: 'top 80%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="tecnologia" className="universe universe--intercom" data-scheme="dark" aria-labelledby="u-intercom">
      <div className="universe__pin">
        <div className="container universe__layout">
          <div className="universe__copy">
            <p className="eyebrow">{category.eyebrow}</p>
            <h2 id="u-intercom" className="t-h2 universe__title">
              {category.headline}
            </h2>
            <ol className="universe__beats">
              {beats.map((b, i) => (
                <li key={b.title} className="beat">
                  <span className="beat__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="t-h3">{b.title}</h3>
                  <p className="t-muted">{b.body}</p>
                </li>
              ))}
            </ol>
            <div className="universe__ticks" aria-hidden="true">
              {beats.map((b) => (
                <span key={b.title} className="universe__tick">
                  <span className="universe__tick-fill" />
                </span>
              ))}
            </div>
          </div>

          <div className="universe__stage">
            <svg className="universe__rings" viewBox="0 0 400 400" aria-hidden="true">
              {[70, 110, 150, 190].map((r, i) => (
                <circle key={r} cx="200" cy="200" r={r} style={{ animationDelay: `${i * 0.6}s` }} />
              ))}
            </svg>
            <ProductVisual
              visual={category.visual}
              cameraRef={camera}
              sizes="(min-width: 900px) 50vw, 90vw"
              className="universe__visual"
              spin
            />
          </div>
        </div>
      </div>
    </section>
  )
}
