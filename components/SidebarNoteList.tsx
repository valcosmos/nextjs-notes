'use client'

import dayjs from 'dayjs'

interface SidebarNoteListProps {
  notes: Record<string, string>
}

export default function NoteList({ notes }: SidebarNoteListProps) {
  const arr = Object.entries(notes)
  if (arr.length === 0) {
    return (
      <div className="notes-empty">
        No notes created yet!
      </div>
    )
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        const { title, updateTime } = JSON.parse(note) as NoteProps
        return (
          <li key={noteId}>
            <header className="sidebar-note-header">
              <strong>{title}</strong>
              <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
            </header>
          </li>
        )
      })}
    </ul>
  )
}
