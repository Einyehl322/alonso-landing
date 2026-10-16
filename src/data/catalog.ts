/**
 * Catálogo SMART RIDE.
 *
 * Modelos reales de intercomunicadores y pantallas CarPlay para motocicleta.
 * Los valores usan las funciones `spec()`, `specPending()` y `specDiscrepancy()`
 * para registrar el estado de verificación de cada dato.
 *
 * Precios en soles peruanos (S/).
 *
 * Para actualizar un precio, busca `commerce.price` en el modelo correspondiente.
 */
import { media } from './media'
import type { Category, CategoryId, Product, SpecCell, SpecGroup, Visual } from './types'
import { spec, specPending, specDiscrepancy } from './types'

/* ---------- visuales compartidos ---------- */

const intercomHelmet: Visual = {
  kind: 'image',
  ...media.casco,
  fit: 'cover',
  position: '58% 50%',
  alt: 'Intercomunicador montado en el lateral de un casco de motocicleta',
}

const displayGraphite: Visual = {
  kind: 'render',
  render: 'display',
  tone: 'graphite',
  alt: 'Pantalla CarPlay para motocicleta con interfaz de navegación',
}

const displaySand: Visual = {
  kind: 'render',
  render: 'display',
  tone: 'sand',
  alt: 'Pantalla CarPlay para motocicleta en acabado claro',
}

const v12Visual: Visual = {
  kind: 'image',
  ...media.v12Hero,
  fit: 'contain',
  alt: 'V12 Pro Wireless Earphone con iluminación RGB, vista en tres cuartos',
}

/* ---------- categorías ---------- */

export const categories: Category[] = [
  {
    id: 'intercomunicadores',
    slug: 'intercomunicadores',
    name: 'Intercomunicadores',
    eyebrow: 'Comunicación en ruta',
    headline: 'Cada voz del grupo, dentro del casco.',
    lede: 'Intercomunicadores y audífonos Bluetooth para hablar con tu acompañante, escuchar música y atender lo importante sin soltar el manillar. Tecnología que se instala en tu casco y te acompaña en cada ruta.',
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
    visual: v12Visual,
  },
  {
    id: 'carplay',
    slug: 'carplay',
    name: 'CarPlay',
    eyebrow: 'Navegación a la vista',
    headline: 'Tu ruta, siempre a la vista.',
    lede: 'Pantallas para motocicleta que llevan la navegación y las apps compatibles de tu teléfono al manillar, con Apple CarPlay y Android Auto. Mapas, música y llamadas en un solo lugar.',
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

/* ---------- helpers de especificaciones: intercomunicadores ---------- */

function intercomSpecs(opts: {
  bluetooth: SpecCell
  alcance: SpecCell
  participantes: SpecCell
  autonomiaIntercom: SpecCell
  autonomiaMusica: SpecCell
  carga: SpecCell
  resistencia: SpecCell
  peso: SpecCell
  montaje: SpecCell
  reduccionRuido: SpecCell
}): SpecGroup[] {
  return [
    {
      group: 'Comunicación',
      items: [
        { label: 'Bluetooth', value: opts.bluetooth },
        { label: 'Alcance', value: opts.alcance },
        { label: 'Participantes', value: opts.participantes },
        { label: 'Reducción de ruido', value: opts.reduccionRuido },
      ],
    },
    {
      group: 'Batería',
      items: [
        { label: 'Autonomía (intercom)', value: opts.autonomiaIntercom },
        { label: 'Autonomía (música)', value: opts.autonomiaMusica },
        { label: 'Tiempo de carga', value: opts.carga },
      ],
    },
    {
      group: 'Diseño',
      items: [
        { label: 'Resistencia al agua', value: opts.resistencia },
        { label: 'Peso', value: opts.peso },
        { label: 'Montaje', value: opts.montaje },
      ],
    },
  ]
}

/* ---------- helpers de especificaciones: CarPlay ---------- */

function displaySpecs(opts: {
  tamano: SpecCell
  resolucion: SpecCell
  carplay: SpecCell
  androidAuto: SpecCell
  camaras: SpecCell
  tpms: SpecCell
  alimentacion: SpecCell
  resistencia: SpecCell
  montaje: SpecCell
}): SpecGroup[] {
  return [
    {
      group: 'Pantalla',
      items: [
        { label: 'Tamaño', value: opts.tamano },
        { label: 'Resolución', value: opts.resolucion },
      ],
    },
    {
      group: 'Conectividad',
      items: [
        { label: 'Apple CarPlay', value: opts.carplay },
        { label: 'Android Auto', value: opts.androidAuto },
      ],
    },
    {
      group: 'Funciones',
      items: [
        { label: 'Cámaras', value: opts.camaras },
        { label: 'Sensor TPMS', value: opts.tpms },
      ],
    },
    {
      group: 'Instalación',
      items: [
        { label: 'Alimentación', value: opts.alimentacion },
        { label: 'Resistencia al agua', value: opts.resistencia },
        { label: 'Montaje', value: opts.montaje },
      ],
    },
  ]
}

/** Commerce sin precio ni disponibilidad definidos. */
const noCommerce = { price: null, promotion: null, availability: null, buyUrl: null } as const

/** Commerce con precio en soles. */
function commercePEN(price: string) {
  return { price: spec(price), promotion: null, availability: null, buyUrl: null } as const
}

/* ===================================================================
   INTERCOMUNICADORES — 4 modelos con datos del catálogo SMART RIDE
   =================================================================== */

/**
 * V12 Motorcycle Earphone — Audífono Bluetooth para casco.
 * NO es intercomunicador: es un audífono individual para música y llamadas.
 * Diseño con iluminación RGB, botones hexagonales y perfil compacto.
 */
const v12Earphone: Product = {
  slug: 'v12-earphone',
  category: 'intercomunicadores',
  name: 'V12 Pro Motorcycle Earphone',
  isDemo: false,
  badge: 'Nuevo',
  tagline: 'Tu música, tus llamadas. Tu casco.',
  summary:
    'Audífono Bluetooth diseñado para integrarse al casco de motocicleta. Iluminación RGB, botones hexagonales intuitivos y sonido envolvente para disfrutar cada ruta con tu música o atender llamadas sin distracciones.',
  theme: { bg: '#0b0c10', surface: '#15171d', scheme: 'dark' },
  visual: v12Visual,
  highlights: [
    { title: spec('Iluminación RGB'), body: spec('Anillo de luz personalizable que destaca en la ruta.'), focus: { x: 65, y: 45, zoom: 1.4 } },
    { title: spec('Botones hexagonales'), body: spec('Controles intuitivos: volumen, micrófono y multimedia.'), focus: { x: 40, y: 55, zoom: 1.5 } },
    { title: spec('Perfil compacto'), body: spec('Diseño angular que se integra al casco sin protuberancias.'), focus: { x: 50, y: 50, zoom: 1 } },
  ],
  details: [
    { caption: spec('Vista general del V12'), visual: v12Visual, focus: { x: 50, y: 50, zoom: 1.1 } },
    { caption: spec('Anillo RGB y logo M'), visual: v12Visual, focus: { x: 68, y: 42, zoom: 1.7 } },
    { caption: spec('Botones + / mic / -'), visual: v12Visual, focus: { x: 38, y: 58, zoom: 1.6 } },
  ],
  benefits: [
    { title: spec('Audio inmersivo'), body: spec('Drivers de 40 mm con graves profundos para música y navegación.') },
    { title: spec('Controles con guantes'), body: spec('Botones hexagonales grandes que puedes operar sin quitarte los guantes.') },
    { title: spec('Diseño llamativo'), body: spec('Iluminación RGB que te distingue en el grupo y aumenta tu visibilidad.') },
  ],
  specs: intercomSpecs({
    bluetooth: spec('Bluetooth 5.3'),
    alcance: spec('Hasta 10 m (audio desde el teléfono)'),
    participantes: spec('1 usuario (audífono individual)'),
    autonomiaIntercom: spec('No aplica — es audífono, no intercomunicador'),
    autonomiaMusica: spec('Hasta 12 h'),
    carga: spec('USB-C, ~1.5 h'),
    resistencia: spec('IP55'),
    peso: specPending('No disponible — verificar con manual'),
    montaje: spec('Clip / abrazadera al casco'),
    reduccionRuido: spec('Sí (pasiva)'),
  }),
  gallery: [
    { visual: v12Visual, caption: 'Vista general' },
    { visual: v12Visual, focus: { x: 68, y: 42, zoom: 1.7 }, caption: 'Anillo RGB' },
    { visual: v12Visual, focus: { x: 38, y: 58, zoom: 1.6 }, caption: 'Botones hexagonales' },
    { visual: intercomHelmet, caption: 'Montado en el casco' },
  ],
  faqs: [
    { question: '¿El V12 permite comunicarme con otro motociclista?', answer: spec('No. El V12 es un audífono Bluetooth individual para escuchar música y atender llamadas desde tu teléfono. No tiene función de intercomunicador.') },
    { question: '¿Puedo usarlo para GPS y música al mismo tiempo?', answer: spec('Sí. El audio de la navegación se mezcla con la música automáticamente.') },
    { question: '¿Es resistente a la lluvia?', answer: spec('Sí, certificación IP55: protegido contra polvo y chorros de agua.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: commercePEN('S/ 75.00'),
}

/**
 * EJEAS Q8 — S/ 299.90
 * Fuente: catálogo SMART RIDE.
 * Nota: Mesh + Bluetooth, hasta 6 usuarios, 1000 m.
 * Autonomías diferenciadas por modo (Mesh / BT / música).
 */
const ejeasQ8: Product = {
  slug: 'ejeas-q8',
  category: 'intercomunicadores',
  name: 'EJEAS Q8',
  isDemo: false,
  badge: 'Destacado',
  tagline: 'Las mejores rutas también se comparten.',
  summary:
    'El EJEAS Q8 combina intercomunicación Mesh y Bluetooth para grupos de hasta 6 usuarios con un alcance de hasta 1000 m. Hasta 30 horas de autonomía y música compartida. El modelo más completo para quienes viajan en grupo.',
  theme: { bg: '#090b10', surface: '#131824', scheme: 'dark' },
  visual: intercomHelmet,
  highlights: [
    { title: spec('Intercom Mesh'), body: spec('Tecnología Mesh para grupos estables sin desconexiones.'), focus: { x: 55, y: 50, zoom: 1 } },
    { title: spec('Hasta 1000 m'), body: spec('Alcance declarado de 1 km para mantener la comunicación en ruta abierta.'), focus: { x: 60, y: 51, zoom: 1.45 } },
    { title: spec('30 horas'), body: spec('Autonomía declarada de hasta 30 h según el modo de uso.'), focus: { x: 42, y: 54, zoom: 1.5 } },
  ],
  details: [
    { caption: spec('Vista lateral'), visual: intercomHelmet, focus: { x: 60, y: 51, zoom: 1.6 } },
    { caption: spec('Botonera'), visual: intercomHelmet, focus: { x: 42, y: 54, zoom: 1.65 } },
    { caption: spec('Detalle de montaje'), visual: intercomHelmet, focus: { x: 48, y: 62, zoom: 1.75 } },
  ],
  benefits: [
    { title: spec('Mesh + Bluetooth'), body: spec('Conexión Mesh para grupos y Bluetooth individual. Lo mejor de ambas tecnologías.') },
    { title: spec('Música compartida'), body: spec('Comparte música con tu acompañante mientras hablan.') },
    { title: spec('Hasta 30 h'), body: spec('Autonomía declarada de hasta 30 h (varía según el modo).') },
  ],
  specs: intercomSpecs({
    bluetooth: spec('Bluetooth 5.1 + Mesh'),
    alcance: spec('Hasta 1000 m'),
    participantes: spec('Hasta 6 usuarios (Mesh)'),
    autonomiaIntercom: spec('9 h Mesh / 17 h BT'),
    autonomiaMusica: spec('Hasta 29 h'),
    carga: spec('2 h'),
    resistencia: spec('IP67'),
    peso: specPending('No disponible — verificar con manual'),
    montaje: spec('Clip / abrazadera al casco'),
    reduccionRuido: spec('Sí'),
  }),
  gallery: [
    { visual: intercomHelmet, caption: 'Vista general' },
    { visual: intercomHelmet, focus: { x: 60, y: 51, zoom: 1.5 }, caption: 'Control principal' },
    { visual: intercomHelmet, focus: { x: 42, y: 55, zoom: 1.55 }, caption: 'Botonera' },
  ],
  faqs: [
    { question: '¿Cuántos usuarios puede conectar el EJEAS Q8?', answer: spec('Hasta 6 usuarios en red Mesh.') },
    { question: '¿Cuánto dura la batería en modo Mesh?', answer: spec('Hasta 9 horas en intercomunicación Mesh, 17 h en Bluetooth y 29 h en música.') },
    { question: '¿Es compatible con mi casco?', answer: spec('Compatible con la mayoría de cascos mediante clip. Escríbenos para confirmar.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Qué garantía tiene?', answer: specPending('Consultar condiciones de garantía.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: commercePEN('S/ 299.90'),
}

/**
 * FreedConn Hero — S/ 290.90
 * Fuente: catálogo SMART RIDE.
 * Nota: hasta 1500 m, 6 usuarios, hasta 35 h, IP67, reducción de ruido avanzada.
 * Discrepancia: catálogo dice 35 h; datos externos indican 30 h conversación / 26 h música.
 */
const freedConnHero: Product = {
  slug: 'freedconn-hero',
  category: 'intercomunicadores',
  name: 'FreedConn Hero',
  isDemo: false,
  tagline: 'Kilómetros de camino. Conversaciones que continúan.',
  summary:
    'El FreedConn Hero ofrece el mayor alcance declarado de la línea (hasta 1500 m) y hasta 6 usuarios conectados. Con reducción de ruido avanzada y compartición de música, está pensado para los viajes largos.',
  theme: { bg: '#0c0d10', surface: '#161820', scheme: 'dark' },
  visual: intercomHelmet,
  highlights: [
    { title: spec('Hasta 1500 m'), body: spec('El mayor alcance declarado de la línea para grupos dispersos.'), focus: { x: 50, y: 50, zoom: 1 } },
    { title: spec('Hasta 6 usuarios'), body: spec('Conecta con todo el grupo sin perder comunicación.'), focus: { x: 68, y: 45, zoom: 1.3 } },
    { title: spec('Reducción avanzada'), body: spec('Cancelación de ruido para voz clara incluso a alta velocidad.'), focus: { x: 40, y: 58, zoom: 1.4 } },
  ],
  details: [
    { caption: spec('Vista general del FreedConn Hero'), visual: intercomHelmet, focus: { x: 50, y: 50, zoom: 1.4 } },
    { caption: spec('Puerto de carga'), visual: intercomHelmet, focus: { x: 70, y: 68, zoom: 1.7 } },
    { caption: spec('Instalado en casco'), visual: intercomHelmet, focus: { x: 55, y: 48, zoom: 1.3 } },
  ],
  benefits: [
    { title: spec('Máximo alcance'), body: spec('Hasta 1500 m declarados: el intercomunicador con mayor rango de la línea.') },
    { title: spec('Hasta 35 h'), body: spec('Autonomía declarada de hasta 35 h (catálogo). Verificar por modalidad.') },
    { title: spec('Todo clima'), body: spec('IP67 y reducción de ruido avanzada para lluvia y viento.') },
  ],
  specs: intercomSpecs({
    bluetooth: spec('Bluetooth 5.1'),
    alcance: spec('Hasta 1500 m'),
    participantes: spec('Hasta 6 usuarios'),
    autonomiaIntercom: specDiscrepancy('Hasta 35 h', 'Catálogo: 35 h. Fuente externa: 30 h conversación. Verificar con producto físico.'),
    autonomiaMusica: spec('Hasta 26 h'),
    carga: spec('2 h'),
    resistencia: spec('IP67'),
    peso: spec('48 g'),
    montaje: spec('Clip / abrazadera al casco'),
    reduccionRuido: spec('Sí (avanzada)'),
  }),
  gallery: [
    { visual: intercomHelmet, caption: 'Vista general' },
    { visual: intercomHelmet, focus: { x: 70, y: 68, zoom: 1.7 }, caption: 'Puerto de carga' },
    { visual: intercomHelmet, focus: { x: 34, y: 40, zoom: 1.5 }, caption: 'Controles' },
    { visual: intercomHelmet, caption: 'Montado en el casco' },
  ],
  faqs: [
    { question: '¿Cuál es la autonomía real del FreedConn Hero?', answer: spec('Catálogo: hasta 35 h. Fuentes externas: 30 h conversación, 26 h música. Consultar para confirmar.') },
    { question: '¿Cuántos participantes puede conectar?', answer: spec('Hasta 6 usuarios.') },
    { question: '¿Es compatible con mi casco?', answer: spec('Compatible con la mayoría de cascos mediante clip. Consúltanos si tienes dudas.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Qué garantía tiene?', answer: specPending('Consultar condiciones de garantía.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: commercePEN('S/ 290.90'),
}

/**
 * EJEAS V6 Pro Plus — S/ 125.00
 * Fuente: catálogo SMART RIDE dice BT 5.3, 1200 m, 40 h, IP65.
 * Discrepancia con specs públicas del fabricante: BT 5.1, 800 m, 18 h intercom, IP67.
 * Se muestra el dato del catálogo con nota de discrepancia interna.
 */
const ejeasV6ProPlus: Product = {
  slug: 'ejeas-v6-pro-plus',
  category: 'intercomunicadores',
  name: 'EJEAS V6 Pro Plus',
  isDemo: false,
  tagline: 'Todo lo que necesitas para comunicarte en la ruta.',
  summary:
    'El EJEAS V6 Pro Plus ofrece hasta 6 usuarios vinculados con reducción de ruido DSP. Opción equilibrada entre funciones completas y precio accesible. Nota: existen discrepancias entre nuestro catálogo y las specs públicas del fabricante para este modelo.',
  theme: { bg: '#0a0b0f', surface: '#141620', scheme: 'dark' },
  visual: intercomHelmet,
  highlights: [
    { title: spec('Hasta 6 vinculados'), body: spec('Conecta varios cascos; conversación simultánea entre 2 usuarios.'), focus: { x: 50, y: 50, zoom: 1 } },
    { title: spec('Reducción DSP'), body: spec('Cancelación de ruido digital para llamadas más claras.'), focus: { x: 62, y: 48, zoom: 1.35 } },
    { title: spec('Precio accesible'), body: spec('Funciones completas a un precio competitivo.'), focus: { x: 40, y: 42, zoom: 1.3 } },
  ],
  details: [
    { caption: spec('Vista general'), visual: intercomHelmet, focus: { x: 50, y: 50, zoom: 1.4 } },
    { caption: spec('Detalle de controles'), visual: intercomHelmet, focus: { x: 68, y: 55, zoom: 1.6 } },
    { caption: spec('Instalado en casco'), visual: intercomHelmet, focus: { x: 55, y: 50, zoom: 1.3 } },
  ],
  benefits: [
    { title: spec('Completo y accesible'), body: spec('Funciones esenciales a un precio competitivo.') },
    { title: spec('DSP integrado'), body: spec('Reducción de ruido digital para llamadas y comunicación.') },
    { title: spec('Versátil'), body: spec('Hasta 6 vinculados, música y llamadas.') },
  ],
  specs: intercomSpecs({
    bluetooth: specDiscrepancy('Bluetooth 5.3', 'Catálogo: BT 5.3. Fabricante: BT 5.1. Verificar versión exacta del modelo vendido.'),
    alcance: specDiscrepancy('Hasta 1200 m', 'Catálogo: 1200 m. Fabricante: 800 m. Verificar con producto físico.'),
    participantes: spec('Hasta 6 vinculados (2 en conversación simultánea)'),
    autonomiaIntercom: specDiscrepancy('Hasta 40 h', 'Catálogo: 40 h. Fabricante: 18 h intercom, 25 h música. Verificar.'),
    autonomiaMusica: specPending('Verificar — fabricante reporta 25 h música para V6 Pro+'),
    carga: specPending('Verificar con producto físico'),
    resistencia: specDiscrepancy('IP65', 'Catálogo: IP65. Fabricante: IP67. Verificar versión exacta.'),
    peso: specPending('No disponible — verificar con manual'),
    montaje: spec('Clip / abrazadera al casco'),
    reduccionRuido: spec('Sí (DSP)'),
  }),
  gallery: [
    { visual: intercomHelmet, caption: 'Vista general' },
    { visual: intercomHelmet, focus: { x: 68, y: 55, zoom: 1.6 }, caption: 'Controles' },
    { visual: intercomHelmet, caption: 'Montado en el casco' },
  ],
  faqs: [
    { question: '¿Cuántos participantes puede conectar el V6 Pro Plus?', answer: spec('Hasta 6 dispositivos vinculados, con conversación simultánea entre 2 usuarios.') },
    { question: '¿Las especificaciones coinciden con el fabricante?', answer: spec('Existen diferencias entre nuestro catálogo y las specs públicas del fabricante. Consúltanos para confirmar la versión exacta.') },
    { question: '¿Es compatible con mi casco?', answer: spec('Compatible con la mayoría de cascos. Escríbenos si necesitas confirmar.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Qué garantía tiene?', answer: specPending('Consultar condiciones de garantía.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: commercePEN('S/ 125.00'),
}

/* ===================================================================
   CARPLAY — 4 modelos con renders ilustrativos
   =================================================================== */

/** CarPlay 6.25" Full */
const carplay625Full: Product = {
  slug: 'carplay-625-full',
  category: 'carplay',
  name: 'CarPlay 6.25" Full',
  isDemo: true,
  tagline: 'Tu navegación y conectividad, en una pantalla para tu moto.',
  summary:
    'Pantalla compacta con Apple CarPlay y Android Auto para llevar la navegación al manillar sin ocupar demasiado espacio. Ideal para motos de cualquier cilindrada.',
  theme: { bg: '#0c0d0f', surface: '#17191d', scheme: 'dark' },
  visual: displayGraphite,
  highlights: [
    { title: spec('Tamaño compacto'), body: spec('Cabe en cualquier manillar sin estorbar.'), focus: { x: 50, y: 45, zoom: 1 } },
    { title: spec('CarPlay y Android Auto'), body: spec('Tu teléfono, proyectado en la pantalla de la moto.'), focus: { x: 56, y: 40, zoom: 1.7 } },
    { title: spec('Instalación sencilla'), body: spec('Se fija al manillar y se conecta para funcionar.'), focus: { x: 50, y: 86, zoom: 1.9 } },
  ],
  details: [
    { caption: spec('Vista frontal'), visual: displayGraphite, focus: { x: 58, y: 38, zoom: 2 } },
    { caption: spec('Lateral'), visual: displayGraphite, focus: { x: 22, y: 40, zoom: 2.2 } },
    { caption: spec('Soporte de montaje'), visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 } },
  ],
  benefits: [
    { title: spec('Navegación a la vista'), body: spec('Mapas claros en una pantalla dedicada, sin sacar el teléfono.') },
    { title: spec('Compatible con tu teléfono'), body: spec('Apple CarPlay y Android Auto incluidos.') },
    { title: spec('Compacta y práctica'), body: spec('6.25 pulgadas que caben en cualquier manillar.') },
  ],
  specs: displaySpecs({
    tamano: spec('6.25"'),
    resolucion: specPending('No disponible — verificar con fabricante'),
    carplay: spec('Sí'),
    androidAuto: spec('Sí'),
    camaras: specPending('No disponible — verificar modelo'),
    tpms: specPending('No disponible — verificar modelo'),
    alimentacion: spec('Cable a batería 12V'),
    resistencia: specPending('No disponible — verificar con fabricante'),
    montaje: spec('Abrazadera al manillar'),
  }),
  gallery: [
    { visual: displayGraphite, caption: 'Vista general' },
    { visual: displayGraphite, focus: { x: 58, y: 38, zoom: 1.9 }, caption: 'Pantalla' },
    { visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
  ],
  faqs: [
    { question: '¿Es compatible con mi teléfono?', answer: spec('Funciona con iPhone (CarPlay) y Android (Android Auto). Consúltanos si tienes dudas sobre tu modelo.') },
    { question: '¿Cómo se instala?', answer: spec('Se fija al manillar con una abrazadera incluida y se conecta a la batería de la moto.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Qué garantía tiene?', answer: specPending('Consultar condiciones de garantía.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: noCommerce,
}

/** CarPlay 8.1" HD */
const carplay81HD: Product = {
  slug: 'carplay-81-hd',
  category: 'carplay',
  name: 'CarPlay 8.1" HD',
  isDemo: true,
  tagline: 'Más espacio para ver lo que importa en tu ruta.',
  summary:
    'Pantalla grande de 8.1 pulgadas para quienes prefieren ver el mapa con más detalle. CarPlay y Android Auto en un formato que no te deja con dudas en la ruta.',
  theme: { bg: '#0b0c10', surface: '#161820', scheme: 'dark' },
  visual: displayGraphite,
  highlights: [
    { title: spec('Pantalla grande'), body: spec('8.1 pulgadas para ver el mapa con comodidad.'), focus: { x: 50, y: 45, zoom: 1 } },
    { title: spec('Alta definición'), body: spec('Detalles claros incluso bajo el sol.'), focus: { x: 56, y: 40, zoom: 1.7 } },
    { title: spec('Con todo'), body: spec('CarPlay, Android Auto y funciones adicionales.'), focus: { x: 50, y: 86, zoom: 1.9 } },
  ],
  details: [
    { caption: spec('Vista frontal'), visual: displayGraphite, focus: { x: 58, y: 38, zoom: 2 } },
    { caption: spec('Detalle de conexiones'), visual: displayGraphite, focus: { x: 22, y: 40, zoom: 2.2 } },
    { caption: spec('Soporte'), visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 } },
  ],
  benefits: [
    { title: spec('Más pantalla, más claridad'), body: spec('8.1 pulgadas para ver el mapa, las indicaciones y las apps con comodidad.') },
    { title: spec('Visible al sol'), body: spec('Panel HD con brillo suficiente para condiciones de luz directa.') },
    { title: spec('Completa'), body: spec('CarPlay y Android Auto con espacio para funciones adicionales.') },
  ],
  specs: displaySpecs({
    tamano: spec('8.1" HD'),
    resolucion: specPending('No disponible — verificar con fabricante'),
    carplay: spec('Sí'),
    androidAuto: spec('Sí'),
    camaras: specPending('No disponible — verificar modelo'),
    tpms: specPending('No disponible — verificar modelo'),
    alimentacion: spec('Cable a batería 12V'),
    resistencia: specPending('No disponible — verificar con fabricante'),
    montaje: spec('Abrazadera al manillar'),
  }),
  gallery: [
    { visual: displayGraphite, caption: 'Vista general' },
    { visual: displayGraphite, focus: { x: 50, y: 50, zoom: 1.8 }, caption: 'Pantalla' },
    { visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
  ],
  faqs: [
    { question: '¿Es compatible con mi teléfono?', answer: spec('Funciona con iPhone (CarPlay) y Android (Android Auto). Consúltanos si tienes dudas.') },
    { question: '¿Cabe en mi manillar?', answer: spec('8.1 pulgadas requiere un manillar con espacio suficiente. Escríbenos con el modelo de tu moto y te confirmamos.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Qué garantía tiene?', answer: specPending('Consultar condiciones de garantía.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: noCommerce,
}

/** CarPlay 7" Base magnética */
const carplay7Magnetica: Product = {
  slug: 'carplay-7-magnetica',
  category: 'carplay',
  name: 'CarPlay 7" Base magnética',
  isDemo: true,
  tagline: 'Se pone y se quita en un segundo.',
  summary:
    'Pantalla de 7 pulgadas con base magnética para quienes quieren llevarla y traerla sin herramientas. Ideal si compartes la moto o prefieres no dejarla puesta.',
  theme: { bg: '#0c0d0f', surface: '#17191d', scheme: 'dark' },
  visual: displayGraphite,
  highlights: [
    { title: spec('Base magnética'), body: spec('Se monta y retira sin herramientas, en un segundo.'), focus: { x: 50, y: 45, zoom: 1 } },
    { title: spec('7 pulgadas'), body: spec('Tamaño intermedio: más que la compacta, menos que la grande.'), focus: { x: 56, y: 40, zoom: 1.7 } },
    { title: spec('CarPlay y Android Auto'), body: spec('Compatible con los teléfonos más usados.'), focus: { x: 50, y: 86, zoom: 1.9 } },
  ],
  details: [
    { caption: spec('Vista frontal'), visual: displayGraphite, focus: { x: 58, y: 38, zoom: 2 } },
    { caption: spec('Base magnética'), visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 } },
    { caption: spec('Lateral'), visual: displayGraphite, focus: { x: 22, y: 40, zoom: 2.2 } },
  ],
  benefits: [
    { title: spec('Montaje magnético'), body: spec('La base queda fija en la moto y la pantalla se pone y quita fácilmente.') },
    { title: spec('Tamaño versátil'), body: spec('7 pulgadas para ver bien sin ocupar demasiado espacio.') },
    { title: spec('Llévala contigo'), body: spec('Si no quieres dejarla en la moto, simplemente retírala.') },
  ],
  specs: displaySpecs({
    tamano: spec('7"'),
    resolucion: specPending('No disponible — verificar con fabricante'),
    carplay: spec('Sí'),
    androidAuto: spec('Sí'),
    camaras: specPending('No disponible — verificar modelo'),
    tpms: specPending('No disponible — verificar modelo'),
    alimentacion: spec('Cable a batería 12V'),
    resistencia: specPending('No disponible — verificar con fabricante'),
    montaje: spec('Base magnética'),
  }),
  gallery: [
    { visual: displayGraphite, caption: 'Vista general' },
    { visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 }, caption: 'Base magnética' },
    { visual: displayGraphite, focus: { x: 56, y: 40, zoom: 1.8 }, caption: 'Pantalla' },
  ],
  faqs: [
    { question: '¿La base magnética es segura en ruta?', answer: specPending('Verificar con pruebas reales.') },
    { question: '¿Es compatible con mi teléfono?', answer: spec('Compatible con iPhone (CarPlay) y Android (Android Auto). Confirma tu modelo con nosotros.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Qué garantía tiene?', answer: specPending('Consultar condiciones de garantía.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: noCommerce,
}

/** CarPlay 6.25" FreedConn */
const carplay625FreedConn: Product = {
  slug: 'carplay-625-freedconn',
  category: 'carplay',
  name: 'CarPlay 6.25" FreedConn',
  isDemo: true,
  tagline: 'La compacta de FreedConn para tu moto.',
  summary:
    'FreedConn ofrece esta pantalla de 6.25" con CarPlay y Android Auto para quienes buscan una solución compacta y confiable de una marca conocida en intercomunicadores.',
  theme: { bg: '#0b0c10', surface: '#151720', scheme: 'dark' },
  visual: displaySand,
  highlights: [
    { title: spec('Marca reconocida'), body: spec('FreedConn, conocida por intercomunicadores, también en pantallas.'), focus: { x: 50, y: 45, zoom: 1 } },
    { title: spec('6.25 pulgadas'), body: spec('Compacta pero suficiente para navegación y música.'), focus: { x: 56, y: 40, zoom: 1.7 } },
    { title: spec('CarPlay y Android Auto'), body: spec('Compatible con los dos ecosistemas principales.'), focus: { x: 50, y: 86, zoom: 1.9 } },
  ],
  details: [
    { caption: spec('Vista frontal'), visual: displaySand, focus: { x: 58, y: 38, zoom: 2 } },
    { caption: spec('Accesos'), visual: displaySand, focus: { x: 22, y: 40, zoom: 2.2 } },
    { caption: spec('Soporte'), visual: displaySand, focus: { x: 50, y: 88, zoom: 2.4 } },
  ],
  benefits: [
    { title: spec('Marca de confianza'), body: spec('FreedConn es referente en comunicación para motociclistas.') },
    { title: spec('Compacta'), body: spec('6.25" cabe donde otras pantallas no entran.') },
    { title: spec('Dual'), body: spec('CarPlay y Android Auto en la misma pantalla.') },
  ],
  specs: displaySpecs({
    tamano: spec('6.25"'),
    resolucion: specPending('No disponible — verificar con fabricante'),
    carplay: spec('Sí'),
    androidAuto: spec('Sí'),
    camaras: specPending('No disponible — verificar modelo'),
    tpms: specPending('No disponible — verificar modelo'),
    alimentacion: spec('Cable a batería 12V'),
    resistencia: specPending('No disponible — verificar con fabricante'),
    montaje: spec('Abrazadera al manillar'),
  }),
  gallery: [
    { visual: displaySand, caption: 'Vista general' },
    { visual: displaySand, focus: { x: 22, y: 40, zoom: 2 }, caption: 'Accesos' },
    { visual: displaySand, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
  ],
  faqs: [
    { question: '¿Es compatible con mi teléfono?', answer: spec('Compatible con iPhone (CarPlay) y Android (Android Auto). Confirma tu modelo.') },
    { question: '¿Qué incluye la caja?', answer: specPending('Verificar contenido con el producto físico.') },
    { question: '¿Qué garantía tiene?', answer: specPending('Consultar condiciones de garantía.') },
    { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: spec('Escríbenos desde el botón de consulta y te responderemos con la información actualizada.') },
  ],
  commerce: noCommerce,
}

/* ---------- exportar catálogo ---------- */

export const products: Product[] = [
  v12Earphone,
  ejeasQ8,
  freedConnHero,
  ejeasV6ProPlus,
  carplay625Full,
  carplay81HD,
  carplay7Magnetica,
  carplay625FreedConn,
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
