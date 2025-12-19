'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Link = {
  id: string
  title: string
  url: string
  position: number
}

export default function DashboardLinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  // 🔹 KULLANICI + LINKLERİ ÇEK
  useEffect(() => {
    const loadLinks = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = '/login'
        return
      }

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('position', { ascending: true })

      if (!error && data) {
        setLinks(data)
      }

      setLoading(false)
    }

    loadLinks()
  }, [])

  // 🔹 LINK EKLE (user_id YOK!)
  const addLink = async () => {
    if (!title || !url) return

    const { error } = await supabase.from('links').insert({
      title,
      url
      // 🚫 user_id YOK
    })

    if (!error) {
      setTitle('')
      setUrl('')
      const { data } = await supabase
        .from('links')
        .select('*')
        .order('position', { ascending: true })

      if (data) setLinks(data)
    }
  }

  if (loading) return <p>Yükleniyor…</p>

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Linklerim</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Başlık"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button onClick={addLink}>Ekle</button>
      </div>

      <ul>
        {links.map(link => (
          <li key={link.id}>
            <strong>{link.title}</strong> – {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
