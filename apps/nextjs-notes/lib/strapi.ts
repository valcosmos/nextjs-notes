const token = 'b90afe3930aa4ca6f84fdb6929df7525f0177f776dbc5842af14ff58978a1e4b99e5d0e9cd57b0c54dc55e25f50aa8df3036a0887a65dd7980bb73b225884110fb320a11ea670ee430383017185e78bbcf4c7509b752d7fd8eb1d6ad9730d0790dfad7b2dc17aa7fcbe1fcd605663c63f41a3b20206684f71286fdd50fcb3b25'

export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`)
  const data = await response.json()

  const res: any = {}

  data.data.forEach(({ _, attributes: { title, content, slug, updatedAt } }: any) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    })
  })

  return res
}

export async function addNote(data: NoteProps) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  })
  const res = await response.json()
  return res.data.attributes.slug
}

export async function updateNote(uuid: string, data: NoteProps) {
  const { id } = await getNote(uuid)
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  })
  const _ = await response.json()
}

export async function getNote(uuid: string) {
  const response = await fetch(`http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`)
  const data = await response.json()
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  }
}

export async function delNote(uuid: string) {
  const { id } = await getNote(uuid)
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'bearer 80985bb38cf749e5568e51c637d796c69c7a6b1e820152a1d144369d9b1568b26eae1070a42f06f691febb07a5134b0a5a00e24e69c298b50414f28c3299ead4b05b9f876883020868c5769a726ae5ca02ef31b2a5786efbccfe041b7131e609eb56680a60e38a973dae25d26d1e4ac56e7651d4d1c6a4e1fe7f68999dbb4eed',
      'Content-Type': 'application/json',
    },
  })
  const _ = await response.json()
}
