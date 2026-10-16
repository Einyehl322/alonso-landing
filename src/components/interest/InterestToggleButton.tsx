import { useInterestList } from './InterestListContext'
import { Icon } from '../ui/Icon'
import './interest-list.css'

export function InterestToggleButton({ slug, className = '' }: { slug: string; className?: string }) {
  const { has, toggle } = useInterestList()
  const active = has(slug)

  return (
    <button
      type="button"
      className={`ilist-toggle ${active ? 'is-active' : ''} ${className}`}
      onClick={() => toggle(slug)}
      aria-label={active ? 'Quitar de mi lista de interés' : 'Agregar a mi lista de interés'}
      aria-pressed={active}
    >
      <Icon name={active ? 'heart-filled' : 'heart'} />
      <span>{active ? 'En mi lista' : 'Me interesa'}</span>
    </button>
  )
}
