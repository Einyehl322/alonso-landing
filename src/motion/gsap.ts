import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Focus } from '../data/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })
ScrollTrigger.config({ ignoreMobileResize: true })

/** Consultas compartidas por todas las coreografías (para gsap.matchMedia). */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 900px)',
  mobile: '(max-width: 899px)',
} as const

/** Atajo: coreografía para escritorio / móvil, solo si el usuario no pidió reducir movimiento. */
export const MQ_CONDITIONS = {
  desktop: `${MQ.motion} and ${MQ.desktop}`,
  mobile: `${MQ.motion} and ${MQ.mobile}`,
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(MQ.reduced).matches
}

/** Curvas propias de la marca. */
export const EASE = {
  /** Entrada cinematográfica: arranque firme, frenada larga. */
  cinematic: 'expo.out',
  /** Movimientos de cámara. */
  camera: 'power3.inOut',
  /** Microinteracciones. */
  snappy: 'power2.out',
}

/**
 * Convierte un encuadre (punto de interés + zoom) en transformaciones GSAP,
 * limitando el desplazamiento para no dejar huecos en los bordes.
 */
export function focusToTransform({ x, y, zoom }: Focus) {
  const max = (zoom - 1) * 50
  const clamp = (v: number) => Math.max(-max, Math.min(max, v))
  return {
    xPercent: clamp(zoom * (50 - x)),
    yPercent: clamp(zoom * (50 - y)),
    scale: zoom,
  }
}

export function focusToCss(focus: Focus) {
  const t = focusToTransform(focus)
  return `translate(${t.xPercent}%, ${t.yPercent}%) scale(${t.scale})`
}

export { gsap, ScrollTrigger, useGSAP }
