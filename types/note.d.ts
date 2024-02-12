interface NoteProps {
  title: string
  content: string
  updateTime: string
}

interface NoteEditStateProps {
  message?: string | null
  errors?: z.ZodIssue[]
}
