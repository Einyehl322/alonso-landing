import type { MouseEvent } from 'react'
import { productWhatsappMessage, whatsappHref } from '../../config/site'
import { productPath } from '../../data/catalog'
import { feature } from '../../data/features'
import type { Product } from '../../data/types'
import { playProductExit } from '../../motion/productTransition'
import { Link } from '../../router/Link'
import { Icon } from '../ui/Icon'
import { specDisplay } from '../ui/Placeholders'
import { FeatureIcon } from './FeatureIcon'
import { Price } from './Price'
import { ShowroomObject } from './ShowroomObject'

interface Props {
  product: Product
  compare?: { checked: boolean; disabled: boolean; onChange: (checked: boolean) => void }
  /** Una sola instancia por página puede llevar el nombre de View Transition. */
  shared?: boolean
}

/** Modelo en el showroom: objeto flotante grande, nombre, precio y lo que lo distingue. */
export function ShowroomCard({ product, compare, shared = true }: Props) {
  const href = productPath(product)
  const contactHref = whatsappHref(productWhatsappMessage(product.name, specDisplay(product.commerce.price)))
  const features = product.showroom?.features ?? []
  const tags = features.filter((k) => feature(k).tag)
  const highlights = tags.length ? tags : features.slice(0, 3)
  const screen = product.showroom?.screen

  const exit = async (e: MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget.closest<HTMLElement>('[data-product-card]')
    if (card) await playProductExit(card)
  }

  return (
    <li className="scard" data-product-card data-tilt-zone>
      <Link to={href} beforeNavigate={exit} className="scard__stage" data-card-stage tabIndex={-1} aria-hidden="true">
        {screen ? <span className="scard__size">{screen}</span> : null}
        {product.showroom?.reference ? <span className="scard__ref">Imagen referencial</span> : null}
        <ShowroomObject product={product} size="card" shared={shared} scaleBySize sizes="(min-width: 1100px) 30vw, (min-width: 700px) 45vw, 90vw" />
      </Link>

      <div className="scard__body" data-card-text>
        <h3 className="scard__name">
          <Link to={href} beforeNavigate={exit}>
            {product.name}
          </Link>
        </h3>
        <p className="scard__tagline">{product.tagline}</p>
        <ul className="scard__tags" aria-label="Características destacadas">
          {highlights.map((key) => (
            <li key={key}>
              <FeatureIcon name={feature(key).icon} />
              {feature(key).short}
            </li>
          ))}
        </ul>
      </div>

      <div className="scard__foot" data-card-text>
        <Price product={product} size="lg" />
        <div className="scard__actions">
          {compare ? (
            <label className={`scard__compare ${compare.disabled ? 'is-disabled' : ''}`} title={compare.disabled ? 'Puedes comparar hasta 3 modelos' : undefined}>
              <input
                type="checkbox"
                checked={compare.checked}
                disabled={compare.disabled}
                onChange={(e) => compare.onChange(e.target.checked)}
              />
              <span>Comparar</span>
            </label>
          ) : null}
          {contactHref ? (
            <a href={contactHref} target="_blank" rel="noopener" className="scard__wa" aria-label={`Consultar ${product.name} por WhatsApp`}>
              <Icon name="whatsapp" />
            </a>
          ) : null}
          <Link to={href} beforeNavigate={exit} className="btn btn--primary btn--sm" aria-label={`Explorar ${product.name}`}>
            Explorar
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </li>
  )
}
