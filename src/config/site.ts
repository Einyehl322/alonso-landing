/**
 * Configuración central de la marca.
 *
 * TODO(contenido): todo lo marcado como PROVISIONAL debe reemplazarse con los
 * datos reales antes de publicar. Los valores `null` se muestran en la web como
 * "Pendiente" para que sean fáciles de detectar.
 */
export const site = {
  /** PROVISIONAL — nombre de marca temporal. */
  brand: {
    name: 'AXIA',
    descriptor: 'Tecnología para motociclistas',
    /** Texto legal del pie de página. */
    legalName: 'AXIA (nombre provisional)',
  },

  /** Contacto comercial. `null` = pendiente de configurar. */
  contact: {
    /** Número en formato internacional sin "+" ni espacios, p. ej. "51987654321". */
    whatsappNumber: null as string | null,
    whatsappDefaultMessage: 'Hola, quiero información sobre sus productos.',
    whatsappProductMessage: 'Hola, quiero información sobre el modelo {producto}.',
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },

  social: [] as { label: string; href: string }[],

  seo: {
    siteUrl: '',
    defaultTitle: 'AXIA — Intercomunicadores y pantallas CarPlay para motocicleta',
    defaultDescription:
      'Intercomunicadores y pantallas CarPlay para motocicleta. Explora la tecnología pensada para viajar conectado.',
    /** Mientras el contenido sea demostrativo conviene no indexar. */
    indexable: false,
  },

  /**
   * Mientras sea `true`, la web muestra avisos de "contenido demostrativo".
   * Ponerlo en `false` cuando el catálogo contenga solo modelos reales.
   */
  demoMode: true,
} as const

export function whatsappHref(message: string = site.contact.whatsappDefaultMessage): string | null {
  const number = site.contact.whatsappNumber
  if (!number) return null
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function productWhatsappMessage(productName: string) {
  return site.contact.whatsappProductMessage.replace('{producto}', productName)
}
