'use server'

import { mkdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Buffer } from 'node:buffer'
import process from 'node:process'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import mime from 'mime'
import dayjs from 'dayjs'

import { addNote, delNote, updateNote } from '@/lib/strapi'

// import { addNote, delNote, updateNote } from '@/lib/strapi'

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
    updateTime: new Date().toISOString(),
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

export async function importNote(formData: FormData) {
  const file = formData.get('file') as File

  // 空值判断
  if (!file)
    return { error: 'File is required.' }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer())
  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}`
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir)

  try {
    await stat(uploadDir)
  }
  catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true })
    }
    else {
      console.error(e)
      return { error: 'Something went wrong.' }
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`
    const filename = file.name.replace(/\.[^/.]+$/, '')
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer)

    // 调用接口，写入数据库
    const res = await addNote({
      title: filename,
      content: buffer.toString('utf-8'),
    })

    // 清除缓存
    revalidatePath('/', 'layout')

    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res }
  }
  catch (e) {
    console.error(e)
    return { error: 'Something went wrong.' }
  }
}
