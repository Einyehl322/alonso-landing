/**
 * Marcadores visibles para contenido pendiente de información oficial.
 * Buscar "Pending" / "DemoBadge" en el código localiza todo lo que falta.
 */
import type { ReactNode } from 'react'
import type { Pending as PendingValue } from '../../data/types'

export function DemoBadge({ children = 'Modelo demostrativo' }: { children?: ReactNode }) {
  return <span className="demo-badge">{children}</span>
}

export function Pending({ label = 'Pendiente', block }: { label?: string; block?: boolean }) {
  return <span className={`pending ${block ? 'pending--block' : ''}`}>{label}</span>
}

/** Muestra el valor si existe; si es null, un marcador de pendiente. */
export function Maybe({ value, label, block }: { value: PendingValue; label?: string; block?: boolean }) {
  return value ? <>{value}</> : <Pending label={label} block={block} />
}
