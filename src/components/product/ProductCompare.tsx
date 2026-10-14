import { getCategory, getProducts, productPath } from '../../data/catalog'
import type { CategoryId, Product } from '../../data/types'
import { Link } from '../../router/Link'
import { Icon } from '../ui/Icon'
import { DemoBadge, Maybe } from '../ui/Placeholders'
import { ProductVisual } from '../visuals/ProductVisual'
import './compare.css'

interface Props {
  category: CategoryId
  /** Modelo actual (se resalta y se muestra primero). */
  current?: Product
  id?: string
}

/**
 * Comparativa entre modelos de la misma categoría. Las filas se construyen a
 * partir de las etiquetas de especificación, así que crecen solas con el catálogo.
 */
export function ProductCompare({ category, current, id = 'comparar' }: Props) {
  const all = getProducts(category)
  if (all.length < 2) return null
  const list = current ? [current, ...all.filter((p) => p !== current)] : all
  const groups = list[0].specs
  const value = (p: Product, group: string, label: string) =>
    p.specs.find((g) => g.group === group)?.items.find((i) => i.label === label)?.value ?? null

  return (
    <section id={id} className="compare section" data-scheme="dark" aria-labelledby={`${id}-title`}>
      <div className="container">
        <p className="eyebrow">Comparar</p>
        <h2 id={`${id}-title`} className="t-h2 compare__title">
          {current ? '¿Cuál es el tuyo?' : `Compara ${getCategory(category).name.toLowerCase()}`}
        </h2>

        <div className="compare__scroller" tabIndex={0} role="region" aria-label="Tabla comparativa, desplazable horizontalmente">
          <table className="compare__table">
            <caption className="sr-only">Comparativa de modelos</caption>
            <thead>
              <tr>
                <th scope="col" className="compare__corner">
                  <span className="sr-only">Característica</span>
                </th>
                {list.map((p) => (
                  <th key={p.slug} scope="col" className={p === current ? 'is-current' : ''}>
                    <div className="compare__product">
                      <div className="compare__thumb" style={{ background: p.theme.bg }}>
                        <ProductVisual visual={p.visual} sizes="160px" />
                      </div>
                      <span className="compare__name">{p.name}</span>
                      {p.isDemo ? <DemoBadge>Demo</DemoBadge> : null}
                      {p === current ? (
                        <span className="compare__here">Estás viendo este modelo</span>
                      ) : (
                        <Link to={productPath(p)} className="text-link">
                          <span>Explorar</span>
                          <Icon name="arrow" />
                        </Link>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Precio</th>
                {list.map((p) => (
                  <td key={p.slug}>
                    <Maybe value={p.commerce.price} />
                  </td>
                ))}
              </tr>
              {groups.flatMap((g) =>
                g.items.map((item) => (
                  <tr key={`${g.group}-${item.label}`}>
                    <th scope="row">
                      <span className="compare__group">{g.group}</span>
                      {item.label}
                    </th>
                    {list.map((p) => (
                      <td key={p.slug}>
                        <Maybe value={value(p, g.group, item.label)} />
                      </td>
                    ))}
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
