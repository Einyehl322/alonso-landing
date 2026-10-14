/**
 * Catálogo.
 *
 * Para añadir un modelo real: copia un objeto de `products`, cambia `slug`,
 * `name`, textos y visuales, pon `isDemo: false` y completa los campos `null`.
 * Las páginas, rutas, comparativas y navegación se generan automáticamente.
 *
 * TODO(contenido): todos los modelos actuales son DEMOSTRATIVOS. No describen
 * productos reales a la venta; sus especificaciones están vacías a propósito.
 */
import { media } from './media'
import type { Category, CategoryId, Product, SpecGroup, Visual } from './types'

const cutout: Visual = {
  kind: 'image',
  ...media.intercomCutout,
  fit: 'contain',
  alt: 'Intercomunicador para casco de motocicleta, vista en tres cuartos (imagen de referencia)',
}

const helmet: Visual = {
  kind: 'image',
  ...media.casco,
  fit: 'cover',
  position: '58% 50%',
  alt: 'Intercomunicador montado en el lateral de un casco, fotografiado sobre fondo negro (imagen de referencia)',
}

const displayGraphite: Visual = {
  kind: 'render',
  render: 'display',
  tone: 'graphite',
  alt: 'Render ilustrativo de una pantalla para motocicleta con navegación en pantalla',
}

const displaySand: Visual = {
  kind: 'render',
  render: 'display',
  tone: 'sand',
  alt: 'Render ilustrativo de una pantalla para motocicleta en acabado claro',
}

export const categories: Category[] = [
  {
    id: 'intercomunicadores',
    slug: 'intercomunicadores',
    name: 'Intercomunicadores',
    eyebrow: 'Comunicación en ruta',
    headline: 'Cada voz del grupo, dentro del casco.',
    lede: 'Intercomunicadores para hablar con tu grupo, escuchar indicaciones y atender lo importante sin soltar el manillar.',
    beats: [
      {
        title: 'Comunicación',
        body: 'Habla con tu acompañante o con el resto del grupo mientras la ruta continúa.',
        focus: { x: 50, y: 50, zoom: 1 },
      },
      {
        title: 'Conectividad',
        body: 'Se vincula con tu teléfono para música, llamadas e indicaciones de navegación.',
        focus: { x: 68, y: 50, zoom: 1.25 },
      },
      {
        title: 'Control',
        body: 'Controles al alcance de la mano, para no apartar la vista del camino.',
        focus: { x: 40, y: 42, zoom: 1.18 },
      },
    ],
    visual: cutout,
  },
  {
    id: 'carplay',
    slug: 'carplay',
    name: 'CarPlay',
    eyebrow: 'Navegación a la vista',
    headline: 'Tu ruta, siempre a la vista.',
    lede: 'Pantallas para motocicleta que llevan la navegación y las apps compatibles de tu teléfono al manillar.',
    beats: [
      {
        title: 'Navegación',
        body: 'Mapas e indicaciones en una pantalla dedicada, frente a ti y no en el bolsillo.',
        focus: { x: 50, y: 42, zoom: 1 },
      },
      {
        title: 'Conectividad',
        body: 'Proyecta las apps compatibles de tu teléfono para usarlas durante el viaje.',
        focus: { x: 30, y: 40, zoom: 1.35 },
      },
      {
        title: 'Comodidad',
        body: 'Música, llamadas y ruta en un solo lugar, para concentrarte en conducir.',
        focus: { x: 66, y: 58, zoom: 1.3 },
      },
    ],
    visual: displayGraphite,
  },
]

/* Especificaciones: solo etiquetas. Los valores se completarán con datos oficiales. */
const intercomSpecs = (): SpecGroup[] => [
  {
    group: 'Comunicación',
    items: [
      { label: 'Conectividad', value: null },
      { label: 'Alcance', value: null },
      { label: 'Participantes', value: null },
    ],
  },
  {
    group: 'Batería',
    items: [
      { label: 'Autonomía', value: null },
      { label: 'Tiempo de carga', value: null },
    ],
  },
  {
    group: 'Diseño',
    items: [
      { label: 'Resistencia al agua', value: null },
      { label: 'Peso', value: null },
      { label: 'Montaje', value: null },
    ],
  },
]

const displaySpecs = (): SpecGroup[] => [
  {
    group: 'Pantalla',
    items: [
      { label: 'Tamaño', value: null },
      { label: 'Resolución', value: null },
      { label: 'Brillo', value: null },
    ],
  },
  {
    group: 'Conectividad',
    items: [
      { label: 'Compatibilidad', value: null },
      { label: 'Conexión con el teléfono', value: null },
    ],
  },
  {
    group: 'Instalación',
    items: [
      { label: 'Alimentación', value: null },
      { label: 'Resistencia al agua', value: null },
      { label: 'Montaje', value: null },
    ],
  },
]

const pendingBenefits = (n: number) => Array.from({ length: n }, () => ({ title: null, body: null }))

const commonFaqs = (kind: 'intercom' | 'display') => [
  {
    question: '¿Cómo puedo consultar precio y disponibilidad?',
    answer:
      'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada del modelo.',
  },
  {
    question:
      kind === 'intercom' ? '¿Es compatible con mi casco?' : '¿Es compatible con mi teléfono y mi motocicleta?',
    answer: null,
  },
  { question: '¿Qué incluye la caja?', answer: null },
  { question: '¿Qué garantía tiene?', answer: null },
]

const noCommerce = { price: null, promotion: null, availability: null, buyUrl: null }

export const products: Product[] = [
  {
    slug: 'modelo-01',
    category: 'intercomunicadores',
    name: 'Intercom 01',
    isDemo: true,
    tagline: 'Presencia de grupo, en un perfil compacto.',
    summary:
      'Ficha demostrativa. Aquí irá la descripción oficial del modelo: para quién es, qué lo distingue y cómo se usa en ruta.',
    theme: { bg: '#0b0c10', surface: '#15171d', scheme: 'dark' },
    visual: cutout,
    highlights: [
      { title: null, body: null, focus: { x: 50, y: 50, zoom: 1 } },
      { title: null, body: null, focus: { x: 72, y: 50, zoom: 1.4 } },
      { title: null, body: null, focus: { x: 36, y: 38, zoom: 1.35 } },
    ],
    details: [
      { caption: null, visual: cutout, focus: { x: 74, y: 50, zoom: 1.55 } },
      { caption: null, visual: cutout, focus: { x: 38, y: 72, zoom: 1.6 } },
      { caption: null, visual: helmet, focus: { x: 60, y: 52, zoom: 1.35 } },
    ],
    benefits: pendingBenefits(3),
    specs: intercomSpecs(),
    gallery: [
      { visual: cutout, caption: 'Vista general' },
      { visual: cutout, focus: { x: 74, y: 50, zoom: 1.5 }, caption: 'Control principal' },
      { visual: cutout, focus: { x: 34, y: 32, zoom: 1.45 }, caption: 'Perfil superior' },
      { visual: helmet, caption: 'Montado en el casco' },
    ],
    faqs: commonFaqs('intercom'),
    commerce: noCommerce,
  },
  {
    slug: 'modelo-02',
    category: 'intercomunicadores',
    name: 'Intercom 02',
    isDemo: true,
    tagline: 'Controles directos para el día a día.',
    summary:
      'Ficha demostrativa. Aquí irá la descripción oficial del modelo, sus diferencias frente al resto de la línea y para qué tipo de motociclista está pensado.',
    theme: { bg: '#090b10', surface: '#131824', scheme: 'dark' },
    visual: helmet,
    highlights: [
      { title: null, body: null, focus: { x: 55, y: 50, zoom: 1 } },
      { title: null, body: null, focus: { x: 60, y: 51, zoom: 1.45 } },
      { title: null, body: null, focus: { x: 42, y: 54, zoom: 1.5 } },
    ],
    details: [
      { caption: null, visual: helmet, focus: { x: 60, y: 51, zoom: 1.6 } },
      { caption: null, visual: helmet, focus: { x: 42, y: 54, zoom: 1.65 } },
      { caption: null, visual: helmet, focus: { x: 48, y: 62, zoom: 1.75 } },
    ],
    benefits: pendingBenefits(3),
    specs: intercomSpecs(),
    gallery: [
      { visual: helmet, caption: 'Vista general' },
      { visual: helmet, focus: { x: 60, y: 51, zoom: 1.5 }, caption: 'Control principal' },
      { visual: helmet, focus: { x: 42, y: 55, zoom: 1.55 }, caption: 'Botonera' },
    ],
    faqs: commonFaqs('intercom'),
    commerce: noCommerce,
  },
  {
    slug: 'pantalla-01',
    category: 'carplay',
    name: 'Pantalla 01',
    isDemo: true,
    tagline: 'La ruta frente a ti.',
    summary:
      'Ficha demostrativa con render ilustrativo. Aquí irá la descripción oficial de la pantalla, su compatibilidad y su instalación.',
    theme: { bg: '#0c0d0f', surface: '#17191d', scheme: 'dark' },
    visual: displayGraphite,
    highlights: [
      { title: null, body: null, focus: { x: 50, y: 45, zoom: 1 } },
      { title: null, body: null, focus: { x: 56, y: 40, zoom: 1.7 } },
      { title: null, body: null, focus: { x: 50, y: 86, zoom: 1.9 } },
    ],
    details: [
      { caption: null, visual: displayGraphite, focus: { x: 58, y: 38, zoom: 2 } },
      { caption: null, visual: displayGraphite, focus: { x: 22, y: 40, zoom: 2.2 } },
      { caption: null, visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 } },
    ],
    benefits: pendingBenefits(3),
    specs: displaySpecs(),
    gallery: [
      { visual: displayGraphite, caption: 'Vista general' },
      { visual: displayGraphite, focus: { x: 58, y: 38, zoom: 1.9 }, caption: 'Pantalla' },
      { visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
    ],
    faqs: commonFaqs('display'),
    commerce: noCommerce,
  },
  {
    slug: 'pantalla-02',
    category: 'carplay',
    name: 'Pantalla 02',
    isDemo: true,
    tagline: 'Un acabado claro para viajes largos.',
    summary:
      'Ficha demostrativa con render ilustrativo. Aquí irá la descripción oficial de la pantalla y en qué se diferencia del resto de la línea.',
    theme: { bg: '#efebe4', surface: '#e4dfd6', scheme: 'light' },
    visual: displaySand,
    highlights: [
      { title: null, body: null, focus: { x: 50, y: 45, zoom: 1 } },
      { title: null, body: null, focus: { x: 22, y: 40, zoom: 1.8 } },
      { title: null, body: null, focus: { x: 50, y: 86, zoom: 1.9 } },
    ],
    details: [
      { caption: null, visual: displaySand, focus: { x: 58, y: 38, zoom: 2 } },
      { caption: null, visual: displaySand, focus: { x: 22, y: 40, zoom: 2.2 } },
      { caption: null, visual: displaySand, focus: { x: 50, y: 88, zoom: 2.4 } },
    ],
    benefits: pendingBenefits(3),
    specs: displaySpecs(),
    gallery: [
      { visual: displaySand, caption: 'Vista general' },
      { visual: displaySand, focus: { x: 22, y: 40, zoom: 2 }, caption: 'Accesos' },
      { visual: displaySand, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
    ],
    faqs: commonFaqs('display'),
    commerce: noCommerce,
  },
]

/* ---------- consultas ---------- */

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getProducts(category: CategoryId) {
  return products.filter((p) => p.category === category)
}

export function getProduct(categorySlug: string, slug: string) {
  const category = getCategoryBySlug(categorySlug)
  if (!category) return undefined
  return products.find((p) => p.category === category.id && p.slug === slug)
}

export function categoryPath(id: CategoryId) {
  return `/${getCategory(id).slug}`
}

export function productPath(p: Product) {
  return `${categoryPath(p.category)}/${p.slug}`
}

/** Siguiente modelo de la misma categoría (circular). */
export function nextProduct(p: Product) {
  const list = getProducts(p.category)
  return list[(list.indexOf(p) + 1) % list.length]
}
