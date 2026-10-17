import { penParts, priceValue } from '../../data/price'
import type { Product } from '../../data/types'
import { Maybe } from '../ui/Placeholders'

/** Precio en soles con jerarquía tipográfica: "S/" discreto, entero protagonista. */
export function Price({ product, size = 'md' }: { product: Product; size?: 'md' | 'lg' | 'xl' }) {
  const amount = priceValue(product)
  if (amount === null) {
    return (
      <span className={`price price--${size}`}>
        <Maybe value={product.commerce.price} />
      </span>
    )
  }
  const { currency, integer, fraction } = penParts(amount)
  return (
    <span className={`price price--${size}`}>
      <span className="sr-only">{product.commerce.price!.display}</span>
      <span className="price__currency" aria-hidden="true">{currency}</span>
      <span className="price__int" aria-hidden="true">{integer}</span>
      <span className="price__fraction" aria-hidden="true">.{fraction}</span>
    </span>
  )
}
