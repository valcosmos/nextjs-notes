interface NoteProps {
  title: string
  content: string
  updateTime: string
}

type NoteObjProps = Record<string, NoteProps>
