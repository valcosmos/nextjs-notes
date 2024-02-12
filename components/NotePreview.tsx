import { marked } from 'marked'
import type { ReactNode } from 'react'
import sanitizeHtml from 'sanitize-html'

interface NotePreviewProps {
  children: string
}

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3',
])
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src'],
  },
)

export default async function NotePreview({ children }: NotePreviewProps) {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(await marked(children || ''), {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  )
}
