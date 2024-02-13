import Link from 'next/link'
import type { ReactNode } from 'react'

interface EditButtonProps {
  noteId: string | null
  children: ReactNode
}

export default function EditButton({ noteId, children }: EditButtonProps) {
  const isDraft = noteId == null
  return (
    <Link href={`/note/edit/${noteId || ''}`} className="link--unstyled">
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline',
        ].join(' ')}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  )
}
