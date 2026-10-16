import { getCategory, getProducts, productCategoryLabel, productPath } from '../../data/catalog'
import type { CategoryId, Product, SpecCell } from '../../data/types'
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

/** Una fila del comparador: etiqueta + un valor por producto. */
interface CompareRow {
  key: string
  groupLabel: string
  itemLabel: string
  cells: SpecCell[]
}

/** Devuelve true si al menos una celda de la fila tiene un dato confirmado o con discrepancia. */
function rowHasData(row: CompareRow): boolean {
  return row.cells.some((c) => c !== null && c.status !== 'pending')
}

function compareLabel(label: string) {
  if (label === 'Alcance') return 'Alcance declarado'
  if (label === 'Music Sharing') return 'Compartir música'
  return label
}

/**
 * Comparativa entre modelos de la misma categoría.
 * Reglas:
 *  - Filas sin ningún dato confirmado → se ocultan.
 *  - Celdas pendientes → "Consultar".
 *  - Celdas con discrepancia → valor del catálogo mostrado normalmente.
 *  - Precio siempre se muestra (fila separada del grupo).
 */
export function ProductCompare({ category, current, id = 'comparar' }: Props) {
  const all = getProducts(category)
  if (all.length < 2) return null
  const list = current ? [current, ...all.filter((p) => p !== current)] : all
  // Unión de especificaciones: el modelo actual no determina las filas ajenas.
  const groups = new Map<string, Set<string>>()
  for (const product of list) {
    for (const group of product.specs) {
      const labels = groups.get(group.group) ?? new Set<string>()
      group.items.forEach((item) => labels.add(compareLabel(item.label)))
      groups.set(group.group, labels)
    }
  }

  // Construir filas
  const rows: CompareRow[] = Array.from(groups).flatMap(([group, labels]) =>
    Array.from(labels).map((label) => ({
      key: `${group}-${label}`,
      groupLabel: group,
      itemLabel: label,
      cells: list.map((p) =>
        p.specs.find((sg) => sg.group === group)?.items.find((si) => compareLabel(si.label) === label)?.value ?? null,
      ),
    })),
  )

  // Filtrar filas que no tienen ningún dato confirmado
  const visibleRows = rows.filter(rowHasData)

  // Agrupar filas visibles por grupo para mostrar encabezados de grupo
  const groupedRows: { group: string; rows: CompareRow[] }[] = []
  for (const row of visibleRows) {
    const last = groupedRows[groupedRows.length - 1]
    if (last && last.group === row.groupLabel) {
      last.rows.push(row)
    } else {
      groupedRows.push({ group: row.groupLabel, rows: [row] })
    }
  }

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
                      <span className="compare__category">{productCategoryLabel(p)}</span>
                      {p.isDemo && <DemoBadge>Fotos pendientes</DemoBadge>}
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
              {/* Precio — siempre visible */}
              <tr>
                <th scope="row">Precio</th>
                {list.map((p) => (
                  <td key={p.slug} className="compare__price">
                    <Maybe value={p.commerce.price} />
                  </td>
                ))}
              </tr>
            </tbody>

            {/* Filas agrupadas */}
            {groupedRows.map((grp) => (
              <tbody key={grp.group}>
                {grp.rows.map((row) => (
                  <tr key={row.key}>
                    <th scope="row">
                      <span className="compare__group">{row.groupLabel}</span>
                      {row.itemLabel}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td key={`${row.key}-${list[i].slug}`}>
                        {list[i].productType === 'helmet-audio' && ['Alcance', 'Alcance declarado', 'Participantes', 'Autonomía (intercom)'].includes(row.itemLabel)
                          ? <span className="t-muted">No aplica</span>
                          : <Maybe value={cell} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  )
}
