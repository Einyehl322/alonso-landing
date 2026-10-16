export type CategoryId = 'intercomunicadores' | 'carplay'

export type RenderTone = 'graphite' | 'sand'

/**
 * Fuente visual de un producto. Mientras falten fotografías oficiales se pueden
 * usar renders ilustrados (`kind: 'render'`). Para incorporar una foto real basta
 * con usar `kind: 'image'`.
 */
export type Visual =
  | { kind: 'render'; render: 'display'; tone: RenderTone; alt: string }
  | {
      kind: 'image'
      src: string
      srcSet?: string
      alt: string
      width: number
      height: number
      /** `contain` para recortes con fondo transparente, `cover` para fotografías. */
      fit: 'contain' | 'cover'
      /** object-position para `cover`, p. ej. "62% 48%". */
      position?: string
      /**
       * Secuencia de fotos para un giro 360° real (24–36 tomas en plataforma
       * giratoria, mismo encuadre y fondo transparente). Opcional.
       */
      spinFrames?: string[]
    }

/** Encuadre de cámara sobre un visual: punto de interés (en %) y acercamiento. */
export interface Focus {
  x: number
  y: number
  zoom: number
}

export interface Category {
  id: CategoryId
  /** Segmento de URL. */
  slug: string
  name: string
  eyebrow: string
  headline: string
  lede: string
  /** Momentos narrativos de la sección de universo. */
  beats: { title: string; body: string; focus: Focus }[]
  visual: Visual
}

/** `null` significa "pendiente de información oficial" y se muestra como tal. */
export type Pending<T = string> = T | null

export interface SpecGroup {
  group: string
  items: { label: string; value: Pending }[]
}

/**
 * Recursos del visor 360°: fotografías reales del producto tomadas en
 * plataforma giratoria (24–72 tomas, mismo encuadre y la misma luz).
 * Ver `src/data/view360.ts` para incorporarlas.
 */
export interface View360 {
  /** URLs en orden de giro. */
  frames: string[]
  /** Tamaño en píxeles de cada toma de `frames`. */
  width: number
  height: number
  /** Opcional: la misma secuencia en alta resolución, para pantallas densas y zoom. */
  zoomFrames?: string[]
  zoomWidth?: number
  /** Toma que coincide con la vista frontal de la ficha. */
  initialFrame?: number
  /** true si las tomas avanzan en sentido antihorario. */
  reverse?: boolean
  /** Solo para el banco de pruebas: no es una fotografía del producto. */
  isTestPattern?: boolean
}

export interface Product {
  slug: string
  category: CategoryId
  name: string
  /** Marca el producto como demostrativo (no disponible para la venta). */
  isDemo: boolean
  /** Etiqueta opcional: "Nuevo", "Popular", etc. */
  badge?: string
  tagline: string
  summary: string
  theme: {
    /** Fondo del universo del producto. */
    bg: string
    /** Superficie secundaria (paneles). */
    surface: string
    scheme: 'dark' | 'light'
  }
  visual: Visual
  /** Introducción visual: la cámara recorre estos puntos del producto. */
  highlights: { title: Pending; body: Pending; focus: Focus }[]
  /** Acercamientos de detalle. */
  details: { caption: Pending; visual: Visual; focus: Focus }[]
  benefits: { title: Pending; body: Pending }[]
  specs: SpecGroup[]
  gallery: { visual: Visual; focus?: Focus; caption: string }[]
  faqs: { question: string; answer: Pending }[]
  /** Visor 360°. Si no existe, el producto mantiene su presentación actual. */
  view360?: View360
  commerce: {
    price: Pending
    promotion: Pending
    availability: Pending
    /** Enlace a una tienda real, si existe. */
    buyUrl: Pending
  }
}
