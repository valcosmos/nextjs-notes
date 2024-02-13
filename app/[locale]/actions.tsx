'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { addNote, delNote, updateNote } from '@/lib/redis'

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100'),
})

// const sleep = ms => new Promise(r => setTimeout(r, ms))

export async function saveNote(prevState: NoteEditStateProps, formData: FormData) {
  // 获取 noteId
  const noteId = formData.get('noteId') as string
  const data: NoteProps = {
    title: formData.get('title') as string,
    content: formData.get('body') as string,
    updateTime: new Date().toString(),
  }

  // 校验数据
  const validated = schema.safeParse(data)
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    }
  }

  // 模拟请求时间
  // await sleep(2000)

  // 更新数据库
  if (noteId) {
    await updateNote(noteId, data)
    revalidatePath('/', 'layout')
  }
  else {
    await addNote(data)
    revalidatePath('/', 'layout')
  }

  return { message: `Add Success!` } as NoteEditStateProps
}

export async function deleteNote(prevState: NoteEditStateProps, formData: FormData) {
  const noteId = formData.get('noteId')
  delNote(noteId as string)
  revalidatePath('/', 'layout')
  redirect('/')
}
