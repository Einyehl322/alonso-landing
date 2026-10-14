import { categoryPath, getCategory, getProducts } from '../../data/catalog'
import type { CategoryId } from '../../data/types'
import { Link } from '../../router/Link'
import { Icon } from '../ui/Icon'
import { ProductCard } from './ProductCard'
import './product-card.css'

interface Props {
  category: CategoryId
  scheme: 'dark' | 'light'
  title?: string
  /** Muestra el enlace a la página de la categoría (en la home). */
  linkToCategory?: boolean
  id?: string
}

/** Modelos de una categoría como presentaciones amplias y alternas, no como rejilla. */
export function ProductCollection({ category, scheme, title, linkToCategory, id }: Props) {
  const c = getCategory(category)
  const list = getProducts(category)

  return (
    <section id={id} className="collection section" data-scheme={scheme} aria-labelledby={`col-${category}`}>
      <div className="container">
        <header className="collection__head" data-fade-on-enter>
          <div>
            <p className="eyebrow">Modelos</p>
            <h2 id={`col-${category}`} className="t-h2">
              {title ?? c.name}
            </h2>
          </div>
          {linkToCategory ? (
            <Link to={categoryPath(category)} className="text-link">
              <span>Ver y comparar {c.name.toLowerCase()}</span>
              <Icon name="arrow" />
            </Link>
          ) : null}
        </header>
        <div className="collection__list">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} align={i % 2 === 0 ? 'start' : 'end'} />
          ))}
        </div>
      </div>
    </section>
  )
}
