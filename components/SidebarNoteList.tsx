import SidebarNoteItem from '@/components/SidebarNoteItem'

interface SidebarNoteListProps {
  notes: Record<string, string>
}

export default async function NoteList({ notes }: SidebarNoteListProps) {
  // const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  // await sleep(1000)
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
        // const { title, updateTime } = JSON.parse(note) as NoteProps
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        )
      })}
    </ul>
  )
}
