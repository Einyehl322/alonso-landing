const PATHS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  'arrow-down': 'M12 5v14M6 13l6 6 6-6',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  external: 'M7 17 17 7M9 7h8v8',
  plus: 'M12 5v14M5 12h14',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6 6 18',
  'chevron-left': 'M15 6l-6 6 6 6',
  'chevron-right': 'M9 6l6 6-6 6',
} as const

export type IconName = keyof typeof PATHS | 'whatsapp'

export function Icon({ name, className = 'btn__icon' }: { name: IconName; className?: string }) {
  if (name === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.82.83-3.03-.2-.31a8.22 8.22 0 1 1 6.95 3.84Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.37-2.95c-.25-.44.25-.41.72-1.36.08-.16.04-.3-.02-.42l-.75-1.82c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.73 2.73 0 0 0-.85 2.03 4.75 4.75 0 0 0 1 2.52 10.86 10.86 0 0 0 4.16 3.68c1.55.67 2.16.73 2.93.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${name === 'arrow' ? 'btn__icon--arrow' : ''}`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
