/**
 * Recursos fotográficos.
 *
 * Las imágenes de referencia originales medían ~1000 px; las versiones grandes se
 * reescalaron x4 con IA (Real-ESRGAN) para que se vean nítidas a pantalla completa.
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
import cutout800 from '../assets/media/intercom-cutout-800.webp'
import cutout1200 from '../assets/media/intercom-cutout-1200.webp'
import cutout1800 from '../assets/media/intercom-cutout-1800.webp'

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
  /** Intercomunicador recortado sobre fondo transparente. */
  intercomCutout: {
    src: cutout1200,
    srcSet: `${cutout800} 800w, ${cutout1200} 1200w, ${cutout1800} 1800w`,
    width: 1800,
    height: 1697,
  },
} as const
