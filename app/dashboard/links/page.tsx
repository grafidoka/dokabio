'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

type Link = {
  id: string
  title: string
  url: string
  position: number
}

export default function DashboardLinksPage() {
  const supabase = supabaseBrowser()

  const [links, setLinks] = useState<Link[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  // 🔹 Linkleri çek
  useEffect(() => {
    const loadLinks = async () => {
      const { data, error } = await supabase
        .from('links')
        .select('id, title, url, position')
        .eq('is_active', true)
        .order('position', { ascending: true })

      if (!error && data) {
        setLinks(data)
      }

      setLoading(false)
    }

    loadLinks()
  }, [])

  // 🔹 Yeni link ekle
  const addLink = async () => {
    if (!title || !url) return

    const { error } = await supabase.from('links').insert({
      title,
      url,
    })

    if (!error) {
      setTitle('')
      setUrl('')

      // yeniden çek
      const { data } = await supabase
        .from('links')
        .select('id, title, url, position')
        .eq('is_active', true)
        .order('position', { ascending: true })

      if (data) setLinks(data)
    }
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Yükleniyor…</div>
  }

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>Links</h1>

      {/* FORM */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={addLink}>Ekle</button>
      </div>

      {/* LİSTE */}
      {links.length === 0 && <p>Henüz link yok.</p>}

      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <strong>{link.title}</strong> – {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
