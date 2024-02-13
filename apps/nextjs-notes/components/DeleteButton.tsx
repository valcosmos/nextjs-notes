import { useFormStatus } from 'react-dom'
import Image from 'next/image'

interface DeleteButtonProps {
  isDraft: boolean
  formAction: () => void
}

export default function DeleteButton({ isDraft, formAction }: DeleteButtonProps) {
  const { pending } = useFormStatus()
  return !isDraft && (
    <button
      className="note-editor-delete"
      disabled={pending}
      formAction={formAction}
      role="menuitem"
    >
      <Image
        src="/cross.svg"
        width={10}
        height={10}
        alt=""
        role="presentation"
      />
      Delete
    </button>
  )
}
