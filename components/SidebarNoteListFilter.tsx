'use client'

import { useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'

interface SidebarNoteListFilterProps {
  notes: {
    noteId: string
    note: NoteProps
    header: JSX.Element
  }[]
  children?: ReactNode
}

// function handleNote(note: string) {
//   return typeof JSON.parse(note) === 'string' ? JSON.parse(JSON.parse(note)) : JSON.parse(note)
// }

export default function SidebarNoteListFilter({ notes }: SidebarNoteListFilterProps) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')

  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem
        if (!searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={(
                <p className="sidebar-note-excerpt">
                  {note.content.substring(0, 20) || <i>(No content)</i>}
                </p>
              )}
            >
              {header}
            </SidebarNoteItemContent>
          )
        }

        return null
      })}
    </ul>
  )
}
