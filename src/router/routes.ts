import { getCategoryBySlug, getProduct } from '../data/catalog'
import type { Category, Product } from '../data/types'

export type Route =
  | { name: 'home' }
  | { name: 'category'; category: Category }
  | { name: 'product'; product: Product }
  | { name: 'not-found' }

export function matchRoute(pathname: string): Route {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return { name: 'home' }
  if (parts.length === 1) {
    const category = getCategoryBySlug(parts[0])
    return category ? { name: 'category', category } : { name: 'not-found' }
  }
  if (parts.length === 2) {
    const product = getProduct(parts[0], parts[1])
    return product ? { name: 'product', product } : { name: 'not-found' }
  }
  return { name: 'not-found' }
}
