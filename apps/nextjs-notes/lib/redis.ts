import Redis from 'ioredis'

const redis = new Redis({
  username: 'default', // needs Redis >= 6
  password: 'root123456',
})

const initialData = {
  1702459181837: '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459182837: '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  1702459188837: '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
}

export async function getAllNotes() {
  const data = await redis.hgetall('notes')
  if (Object.keys(data).length === 0)
    await redis.hset('notes', initialData)

  return await redis.hgetall('notes')
}

export async function addNote(data: NoteProps) {
  const uuid = Date.now().toString()
  await redis.hset('notes', uuid, JSON.stringify(data))
  return uuid
}

export async function updateNote(uuid: string, data: NoteProps) {
  await redis.hset('notes', uuid, JSON.stringify(data))
}

export async function getNote(uuid: string) {
  const notes = await redis.hget('notes', uuid)
  const resNotes = JSON.parse(notes ?? '{}')
  if (typeof resNotes === 'string')
    return JSON.parse(resNotes)
  return resNotes
}

export async function delNote(uuid: string) {
  return redis.hdel('notes', uuid)
}

export async function addUser(username: string, password: string) {
  await redis.hset('users', username, password)
  return {
    name: username,
    username,
  }
}

export async function getUser(username: string, password: string) {
  const passwordFromDB = await redis.hget('users', username)
  if (!passwordFromDB)
    return 0
  if (passwordFromDB !== password)
    return 1
  return {
    name: username,
    username,
  }
}

export default redis
