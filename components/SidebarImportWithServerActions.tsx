'use client'

import type { ChangeEventHandler } from 'react'
import React, { Suspense, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { importNote } from '@/actions'

function Submit() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Submitting' : 'Submit'}</button>
}

export default function SidebarImportWithServerActions() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  async function upload(formData: FormData) {
    const file = formData.get('file')
    if (!file) {
      console.warn('files list is empty')
      return
    }

    try {
      const data = await importNote(formData)
      router.push(`/note/${data.uid}`)
    }
    catch (error) {
      console.error('something went wrong')
    }

    // 重置 file input
    formRef.current?.reset()
  };

  return (
    <form action={upload} ref={formRef} style={{ textAlign: 'center' }}>
      <label htmlFor="file" style={{ cursor: 'pointer' }}>Import .md File With Server Actions</label>
      <input type="file" id="file" name="file" accept=".md" />
      <div><Submit /></div>
    </form>
  )
}
