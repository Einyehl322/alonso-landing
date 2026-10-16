/**
 * Catálogo SMART RIDE.
 *
 * Modelos reales de intercomunicadores y pantallas CarPlay para motocicleta.
 * Los precios y especificaciones marcados como `null` están pendientes de
 * confirmación oficial y se muestran como "Pendiente" en la web.
 *
 * Para actualizar precios, busca `commerce.price` en el modelo correspondiente.
 */
import { media } from './media'
import type { Category, CategoryId, Product, SpecGroup, Visual } from './types'

/* ---------- visuales compartidos ---------- */

const intercomCutout: Visual = {
  kind: 'image',
  ...media.intercomCutout,
  fit: 'contain',
  alt: 'Intercomunicador para casco de motocicleta, vista en tres cuartos',
}

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
    visual: intercomCutout,
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

/* ---------- helpers de especificaciones ---------- */

function intercomSpecs(opts: {
  bluetooth: string | null
  alcance: string | null
  participantes: string | null
  autonomia: string | null
  carga: string | null
  resistencia: string | null
  peso: string | null
  montaje: string | null
}): SpecGroup[] {
  return [
    {
      group: 'Comunicación',
      items: [
        { label: 'Bluetooth', value: opts.bluetooth },
        { label: 'Alcance', value: opts.alcance },
        { label: 'Participantes', value: opts.participantes },
      ],
    },
    {
      group: 'Batería',
      items: [
        { label: 'Autonomía', value: opts.autonomia },
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

function displaySpecs(opts: {
  tamano: string | null
  resolucion: string | null
  carplay: string | null
  androidAuto: string | null
  camaras: string | null
  tpms: string | null
  alimentacion: string | null
  resistencia: string | null
  montaje: string | null
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

const noCommerce = { price: null, promotion: null, availability: null, buyUrl: null }

/* ---------- productos: intercomunicadores ---------- */

export const products: Product[] = [
  /* ===== INTERCOMUNICADORES ===== */

  {
    slug: 'p30-pro',
    category: 'intercomunicadores',
    name: 'P30 PRO',
    isDemo: true,
    tagline: 'Cada ruta se disfruta más cuando sigues conectado.',
    summary:
      'Intercomunicador grupal para quienes viajan en grupo y necesitan mantenerse en contacto con todos. Perfil compacto, controles intuitivos y la autonomía que acompaña todo el día.',
    theme: { bg: '#0b0c10', surface: '#15171d', scheme: 'dark' },
    visual: intercomCutout,
    highlights: [
      { title: 'Diseño compacto', body: 'Perfil discreto que se integra al casco sin llamar la atención.', focus: { x: 50, y: 50, zoom: 1 } },
      { title: 'Controles accesibles', body: 'Botones que puedes manejar con guantes, sin buscarlos.', focus: { x: 72, y: 50, zoom: 1.4 } },
      { title: 'Comunicación grupal', body: 'Conecta con varios motociclistas al mismo tiempo.', focus: { x: 36, y: 38, zoom: 1.35 } },
    ],
    details: [
      { caption: 'Vista general del intercomunicador', visual: intercomCutout, focus: { x: 74, y: 50, zoom: 1.55 } },
      { caption: 'Controles principales', visual: intercomCutout, focus: { x: 38, y: 72, zoom: 1.6 } },
      { caption: 'Instalado en el casco', visual: intercomHelmet, focus: { x: 60, y: 52, zoom: 1.35 } },
    ],
    benefits: [
      { title: 'Grupo conectado', body: 'Varios motociclistas en la misma conversación, sin perder la señal en ruta.' },
      { title: 'Todo el día', body: 'Batería diseñada para trayectos largos sin necesidad de recargar.' },
      { title: 'Fácil instalación', body: 'Se fija al casco con el montaje incluido y está listo en minutos.' },
    ],
    specs: intercomSpecs({
      bluetooth: 'Bluetooth 5.0',
      alcance: null,
      participantes: 'Grupal',
      autonomia: null,
      carga: null,
      resistencia: null,
      peso: null,
      montaje: 'Abrazadera al casco',
    }),
    gallery: [
      { visual: intercomCutout, caption: 'Vista general' },
      { visual: intercomCutout, focus: { x: 74, y: 50, zoom: 1.5 }, caption: 'Control principal' },
      { visual: intercomCutout, focus: { x: 34, y: 32, zoom: 1.45 }, caption: 'Perfil superior' },
      { visual: intercomHelmet, caption: 'Montado en el casco' },
    ],
    faqs: [
      { question: '¿Cuántos participantes puede conectar el P30 PRO?', answer: null },
      { question: '¿Es compatible con mi casco?', answer: 'El montaje tipo abrazadera se adapta a la mayoría de cascos. Consúltanos para confirmar.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
    commerce: noCommerce,
  },
  {
    slug: 'ejeas-q8',
    category: 'intercomunicadores',
    name: 'EJEAS Q8',
    isDemo: true,
    tagline: 'Las mejores rutas también se comparten.',
    summary:
      'El EJEAS Q8 ofrece comunicación clara entre motociclistas con un diseño pensado para el día a día. Ideal para parejas de viaje y grupos reducidos.',
    theme: { bg: '#090b10', surface: '#131824', scheme: 'dark' },
    visual: intercomHelmet,
    highlights: [
      { title: 'Comunicación clara', body: 'Voz nítida incluso a velocidad de carretera.', focus: { x: 55, y: 50, zoom: 1 } },
      { title: 'Controles directos', body: 'Todo lo necesario sin complicaciones.', focus: { x: 60, y: 51, zoom: 1.45 } },
      { title: 'Diseño resistente', body: 'Preparado para las condiciones del camino.', focus: { x: 42, y: 54, zoom: 1.5 } },
    ],
    details: [
      { caption: 'Vista lateral', visual: intercomHelmet, focus: { x: 60, y: 51, zoom: 1.6 } },
      { caption: 'Botonera', visual: intercomHelmet, focus: { x: 42, y: 54, zoom: 1.65 } },
      { caption: 'Detalle de montaje', visual: intercomHelmet, focus: { x: 48, y: 62, zoom: 1.75 } },
    ],
    benefits: [
      { title: 'Voz nítida', body: 'Cancelación de ruido para que tu voz llegue clara, con viento o sin él.' },
      { title: 'Duo o grupo', body: 'Conecta con tu acompañante o amplía a un pequeño grupo de viaje.' },
      { title: 'Uso diario', body: 'Encendido rápido y controles que no requieren dejar de mirar la ruta.' },
    ],
    specs: intercomSpecs({
      bluetooth: 'Bluetooth 5.0',
      alcance: null,
      participantes: '2–3 usuarios',
      autonomia: null,
      carga: null,
      resistencia: null,
      peso: null,
      montaje: 'Abrazadera al casco',
    }),
    gallery: [
      { visual: intercomHelmet, caption: 'Vista general' },
      { visual: intercomHelmet, focus: { x: 60, y: 51, zoom: 1.5 }, caption: 'Control principal' },
      { visual: intercomHelmet, focus: { x: 42, y: 55, zoom: 1.55 }, caption: 'Botonera' },
    ],
    faqs: [
      { question: '¿Cuántos usuarios puede conectar el EJEAS Q8?', answer: null },
      { question: '¿Es compatible con mi casco?', answer: 'Compatible con la mayoría de cascos mediante abrazadera. Escríbenos para confirmar.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
    commerce: noCommerce,
  },
  {
    slug: 'freedconn-hero',
    category: 'intercomunicadores',
    name: 'FreedConn Hero',
    isDemo: true,
    tagline: 'Kilómetros de camino. Conversaciones que continúan.',
    summary:
      'El FreedConn Hero está diseñado para los que recorren largas distancias y necesitan un intercomunicador que no los deje a mitad de ruta. Autonomía, alcance y resistencia pensados para el viaje largo.',
    theme: { bg: '#0c0d10', surface: '#161820', scheme: 'dark' },
    visual: intercomCutout,
    highlights: [
      { title: 'Larga autonomía', body: 'Diseñado para trayectos que duran más que una carga convencional.', focus: { x: 50, y: 50, zoom: 1 } },
      { title: 'Mayor alcance', body: 'Más distancia entre motociclistas sin perder comunicación.', focus: { x: 68, y: 45, zoom: 1.3 } },
      { title: 'Resistente al agua', body: 'Preparado para la lluvia sin dejar de funcionar.', focus: { x: 40, y: 58, zoom: 1.4 } },
    ],
    details: [
      { caption: 'Vista general del FreedConn Hero', visual: intercomCutout, focus: { x: 50, y: 50, zoom: 1.4 } },
      { caption: 'Puerto de carga', visual: intercomCutout, focus: { x: 70, y: 68, zoom: 1.7 } },
      { caption: 'Instalado en casco', visual: intercomHelmet, focus: { x: 55, y: 48, zoom: 1.3 } },
    ],
    benefits: [
      { title: 'Rutas largas', body: 'Autonomía extendida para que la batería no sea un límite.' },
      { title: 'Más alcance', body: 'Comunicación estable a mayor distancia entre miembros del grupo.' },
      { title: 'Todo clima', body: 'Resistente al agua para que la lluvia no interrumpa tu viaje.' },
    ],
    specs: intercomSpecs({
      bluetooth: 'Bluetooth 5.0',
      alcance: null,
      participantes: 'Grupal',
      autonomia: null,
      carga: null,
      resistencia: 'IPX6',
      peso: null,
      montaje: 'Abrazadera al casco',
    }),
    gallery: [
      { visual: intercomCutout, caption: 'Vista general' },
      { visual: intercomCutout, focus: { x: 70, y: 68, zoom: 1.7 }, caption: 'Puerto de carga' },
      { visual: intercomCutout, focus: { x: 34, y: 40, zoom: 1.5 }, caption: 'Controles' },
      { visual: intercomHelmet, caption: 'Montado en el casco' },
    ],
    faqs: [
      { question: '¿Cuál es la autonomía real del FreedConn Hero?', answer: null },
      { question: '¿Cuántos participantes puede conectar?', answer: null },
      { question: '¿Es compatible con mi casco?', answer: 'Compatible con la mayoría de cascos mediante abrazadera. Consúltanos si tienes dudas.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
    commerce: noCommerce,
  },
  {
    slug: 'ejeas-v6-pro-plus',
    category: 'intercomunicadores',
    name: 'EJEAS V6 Pro Plus',
    isDemo: true,
    tagline: 'Todo lo que necesitas para comunicarte en la ruta.',
    summary:
      'El EJEAS V6 Pro Plus es una opción equilibrada para comunicación entre dos o tres motociclistas. Funciones completas en un paquete accesible.',
    theme: { bg: '#0a0b0f', surface: '#141620', scheme: 'dark' },
    visual: intercomCutout,
    highlights: [
      { title: 'Equilibrado', body: 'Funciones completas sin complicaciones innecesarias.', focus: { x: 50, y: 50, zoom: 1 } },
      { title: 'Fácil de usar', body: 'Configuración sencilla y controles intuitivos.', focus: { x: 62, y: 48, zoom: 1.35 } },
      { title: 'Buena relación calidad-precio', body: 'Intercomunicador completo a un precio accesible.', focus: { x: 40, y: 42, zoom: 1.3 } },
    ],
    details: [
      { caption: 'Vista general', visual: intercomCutout, focus: { x: 50, y: 50, zoom: 1.4 } },
      { caption: 'Detalle de controles', visual: intercomCutout, focus: { x: 68, y: 55, zoom: 1.6 } },
      { caption: 'Instalado en casco', visual: intercomHelmet, focus: { x: 55, y: 50, zoom: 1.3 } },
    ],
    benefits: [
      { title: 'Completo y accesible', body: 'Todo lo esencial para comunicarte en ruta sin pagar de más.' },
      { title: 'Configuración simple', body: 'Emparejar y listo. Sin menús complicados.' },
      { title: 'Versátil', body: 'Funciona para duo o grupo pequeño, música y llamadas.' },
    ],
    specs: intercomSpecs({
      bluetooth: 'Bluetooth 5.0',
      alcance: null,
      participantes: '2–6 usuarios',
      autonomia: null,
      carga: null,
      resistencia: null,
      peso: null,
      montaje: 'Abrazadera al casco',
    }),
    gallery: [
      { visual: intercomCutout, caption: 'Vista general' },
      { visual: intercomCutout, focus: { x: 68, y: 55, zoom: 1.6 }, caption: 'Controles' },
      { visual: intercomHelmet, caption: 'Montado en el casco' },
    ],
    faqs: [
      { question: '¿Cuántos participantes puede conectar el V6 Pro Plus?', answer: null },
      { question: '¿Es compatible con mi casco?', answer: 'Compatible con la mayoría de cascos. Escríbenos si necesitas confirmar.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
    commerce: noCommerce,
  },

  /* ===== CARPLAY ===== */

  {
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
      { title: 'Tamaño compacto', body: 'Cabe en cualquier manillar sin estorbar.', focus: { x: 50, y: 45, zoom: 1 } },
      { title: 'CarPlay y Android Auto', body: 'Tu teléfono, proyectado en la pantalla de la moto.', focus: { x: 56, y: 40, zoom: 1.7 } },
      { title: 'Instalación sencilla', body: 'Se fija al manillar y se conecta para funcionar.', focus: { x: 50, y: 86, zoom: 1.9 } },
    ],
    details: [
      { caption: 'Vista frontal', visual: displayGraphite, focus: { x: 58, y: 38, zoom: 2 } },
      { caption: 'Lateral', visual: displayGraphite, focus: { x: 22, y: 40, zoom: 2.2 } },
      { caption: 'Soporte de montaje', visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 } },
    ],
    benefits: [
      { title: 'Navegación a la vista', body: 'Mapas claros en una pantalla dedicada, sin sacar el teléfono.' },
      { title: 'Compatible con tu teléfono', body: 'Apple CarPlay y Android Auto incluidos.' },
      { title: 'Compacta y práctica', body: '6.25 pulgadas que caben en cualquier manillar.' },
    ],
    specs: displaySpecs({
      tamano: '6.25"',
      resolucion: null,
      carplay: 'Sí',
      androidAuto: 'Sí',
      camaras: null,
      tpms: null,
      alimentacion: 'Cable a batería 12V',
      resistencia: null,
      montaje: 'Abrazadera al manillar',
    }),
    gallery: [
      { visual: displayGraphite, caption: 'Vista general' },
      { visual: displayGraphite, focus: { x: 58, y: 38, zoom: 1.9 }, caption: 'Pantalla' },
      { visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
    ],
    faqs: [
      { question: '¿Es compatible con mi teléfono?', answer: 'Funciona con iPhone (CarPlay) y Android (Android Auto). Consúltanos si tienes dudas sobre tu modelo.' },
      { question: '¿Cómo se instala?', answer: 'Se fija al manillar con una abrazadera incluida y se conecta a la batería de la moto.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
    commerce: noCommerce,
  },
  {
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
      { title: 'Pantalla grande', body: '8.1 pulgadas para ver el mapa con comodidad.', focus: { x: 50, y: 45, zoom: 1 } },
      { title: 'Alta definición', body: 'Detalles claros incluso bajo el sol.', focus: { x: 56, y: 40, zoom: 1.7 } },
      { title: 'Con todo', body: 'CarPlay, Android Auto y funciones adicionales.', focus: { x: 50, y: 86, zoom: 1.9 } },
    ],
    details: [
      { caption: 'Vista frontal', visual: displayGraphite, focus: { x: 58, y: 38, zoom: 2 } },
      { caption: 'Detalle de conexiones', visual: displayGraphite, focus: { x: 22, y: 40, zoom: 2.2 } },
      { caption: 'Soporte', visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 } },
    ],
    benefits: [
      { title: 'Más pantalla, más claridad', body: '8.1 pulgadas para ver el mapa, las indicaciones y las apps con comodidad.' },
      { title: 'Visible al sol', body: 'Panel HD con brillo suficiente para condiciones de luz directa.' },
      { title: 'Completa', body: 'CarPlay y Android Auto con espacio para funciones adicionales.' },
    ],
    specs: displaySpecs({
      tamano: '8.1" HD',
      resolucion: null,
      carplay: 'Sí',
      androidAuto: 'Sí',
      camaras: null,
      tpms: null,
      alimentacion: 'Cable a batería 12V',
      resistencia: null,
      montaje: 'Abrazadera al manillar',
    }),
    gallery: [
      { visual: displayGraphite, caption: 'Vista general' },
      { visual: displayGraphite, focus: { x: 50, y: 50, zoom: 1.8 }, caption: 'Pantalla' },
      { visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
    ],
    faqs: [
      { question: '¿Es compatible con mi teléfono?', answer: 'Funciona con iPhone (CarPlay) y Android (Android Auto). Consúltanos si tienes dudas.' },
      { question: '¿Cabe en mi manillar?', answer: '8.1 pulgadas requiere un manillar con espacio suficiente. Escríbenos con el modelo de tu moto y te confirmamos.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
    commerce: noCommerce,
  },
  {
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
      { title: 'Base magnética', body: 'Se monta y retira sin herramientas, en un segundo.', focus: { x: 50, y: 45, zoom: 1 } },
      { title: '7 pulgadas', body: 'Tamaño intermedio: más que la compacta, menos que la grande.', focus: { x: 56, y: 40, zoom: 1.7 } },
      { title: 'CarPlay y Android Auto', body: 'Compatible con los teléfonos más usados.', focus: { x: 50, y: 86, zoom: 1.9 } },
    ],
    details: [
      { caption: 'Vista frontal', visual: displayGraphite, focus: { x: 58, y: 38, zoom: 2 } },
      { caption: 'Base magnética', visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 } },
      { caption: 'Lateral', visual: displayGraphite, focus: { x: 22, y: 40, zoom: 2.2 } },
    ],
    benefits: [
      { title: 'Montaje magnético', body: 'La base queda fija en la moto y la pantalla se pone y quita fácilmente.' },
      { title: 'Tamaño versátil', body: '7 pulgadas para ver bien sin ocupar demasiado espacio.' },
      { title: 'Llévala contigo', body: 'Si no quieres dejarla en la moto, simplemente retírala.' },
    ],
    specs: displaySpecs({
      tamano: '7"',
      resolucion: null,
      carplay: 'Sí',
      androidAuto: 'Sí',
      camaras: null,
      tpms: null,
      alimentacion: 'Cable a batería 12V',
      resistencia: null,
      montaje: 'Base magnética',
    }),
    gallery: [
      { visual: displayGraphite, caption: 'Vista general' },
      { visual: displayGraphite, focus: { x: 50, y: 88, zoom: 2.4 }, caption: 'Base magnética' },
      { visual: displayGraphite, focus: { x: 56, y: 40, zoom: 1.8 }, caption: 'Pantalla' },
    ],
    faqs: [
      { question: '¿La base magnética es segura en ruta?', answer: null },
      { question: '¿Es compatible con mi teléfono?', answer: 'Compatible con iPhone (CarPlay) y Android (Android Auto). Confirma tu modelo con nosotros.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
    commerce: noCommerce,
  },
  {
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
      { title: 'Marca reconocida', body: 'FreedConn, conocida por intercomunicadores, también en pantallas.', focus: { x: 50, y: 45, zoom: 1 } },
      { title: '6.25 pulgadas', body: 'Compacta pero suficiente para navegación y música.', focus: { x: 56, y: 40, zoom: 1.7 } },
      { title: 'CarPlay y Android Auto', body: 'Compatible con los dos ecosistemas principales.', focus: { x: 50, y: 86, zoom: 1.9 } },
    ],
    details: [
      { caption: 'Vista frontal', visual: displaySand, focus: { x: 58, y: 38, zoom: 2 } },
      { caption: 'Accesos', visual: displaySand, focus: { x: 22, y: 40, zoom: 2.2 } },
      { caption: 'Soporte', visual: displaySand, focus: { x: 50, y: 88, zoom: 2.4 } },
    ],
    benefits: [
      { title: 'Marca de confianza', body: 'FreedConn es referente en comunicación para motociclistas.' },
      { title: 'Compacta', body: '6.25" cabe donde otras pantallas no entran.' },
      { title: 'Dual', body: 'CarPlay y Android Auto en la misma pantalla.' },
    ],
    specs: displaySpecs({
      tamano: '6.25"',
      resolucion: null,
      carplay: 'Sí',
      androidAuto: 'Sí',
      camaras: null,
      tpms: null,
      alimentacion: 'Cable a batería 12V',
      resistencia: null,
      montaje: 'Abrazadera al manillar',
    }),
    gallery: [
      { visual: displaySand, caption: 'Vista general' },
      { visual: displaySand, focus: { x: 22, y: 40, zoom: 2 }, caption: 'Accesos' },
      { visual: displaySand, focus: { x: 50, y: 88, zoom: 2.2 }, caption: 'Soporte' },
    ],
    faqs: [
      { question: '¿Es compatible con mi teléfono?', answer: 'Compatible con iPhone (CarPlay) y Android (Android Auto). Confirma tu modelo.' },
      { question: '¿Qué incluye la caja?', answer: null },
      { question: '¿Qué garantía tiene?', answer: null },
      { question: '¿Cómo puedo consultar precio y disponibilidad?', answer: 'Escríbenos desde el botón de consulta de esta página y te responderemos con la información actualizada.' },
    ],
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
