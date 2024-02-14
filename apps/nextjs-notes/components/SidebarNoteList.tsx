import SidebarNoteItemHeader from './SidebarNoteItemHeader'
import SidebarNoteListFilter from './SidebarNoteListFilter'

import { getAllNotes } from '@/lib/strapi'

// import { getAllNotes } from '@/lib/strapi'

// interface SidebarNoteListProps {
//   notes: Record<string, string>
// }

export default async function NoteList() {
  // const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
  // await sleep(1000)
  const notes = await getAllNotes()

  const arr = Object.entries(notes)
  if (arr.length === 0) {
    return (
      <div className="notes-empty">
        No notes created yet!
      </div>
    )
  }

  // return (
  //   <ul className="notes-list">
  //     {arr.map(([noteId, note]) => {
  //       // const { title, updateTime } = JSON.parse(note) as NoteProps
  //       return (
  //         <li key={noteId}>
  //           <SidebarNoteItem noteId={noteId} note={typeof JSON.parse(note) === 'string' ? JSON.parse(JSON.parse(note)) : JSON.parse(note)} />
  //         </li>
  //       )
  //     })}
  //   </ul>
  // )

  return (
    <SidebarNoteListFilter notes={
      Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note) as NoteProps
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />,
        }
      })
    }
    />
  )
}
