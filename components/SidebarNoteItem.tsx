import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader'

interface SidebarNoteItemProps {
  noteId: string
  note: NoteProps
}

export default function SidebarNoteItem({ noteId, note }: SidebarNoteItemProps) {
  const { title, content = '', updateTime } = note

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={(
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      )}
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  )
}
