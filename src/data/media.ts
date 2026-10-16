/**
 * Recursos fotográficos.
 *
 * TODO(contenido): sustituir por fotografías oficiales en alta resolución y
 * confirmar los derechos de uso de cada una.
 */
import casco1280 from '../assets/media/casco-1280.webp'
import casco1920 from '../assets/media/casco-1920.webp'
import casco2560 from '../assets/media/casco-2560.webp'
import casco3840 from '../assets/media/casco-3840.webp'
import ruta1280 from '../assets/media/ruta-1280.webp'
import ruta1920 from '../assets/media/ruta-1920.webp'
import ruta2560 from '../assets/media/ruta-2560.webp'
import ruta3840 from '../assets/media/ruta-3840.webp'
import v12Hero from '../assets/media/v12-pro-hero.png'

export const media = {
  /** Intercomunicador montado en casco, fondo oscuro (hasta 4K). */
  casco: {
    src: casco1920,
    srcSet: `${casco1280} 1280w, ${casco1920} 1920w, ${casco2560} 2560w, ${casco3840} 3840w`,
    width: 3840,
    height: 3840,
  },
  /** Motociclista en carretera de montaña (hasta 4K). */
  ruta: {
    src: ruta1920,
    srcSet: `${ruta1280} 1280w, ${ruta1920} 1920w, ${ruta2560} 2560w, ${ruta3840} 3840w`,
    width: 3840,
    height: 3840,
  },
  /** V12 Pro: Audífono con iluminación RGB. */
  v12Hero: {
    src: v12Hero,
    width: 1920, /* Estimated width */
    height: 1080, /* Estimated height */
  },
} as const
