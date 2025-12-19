'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/browser'

type Link = {
  id: string
  title: string
  url: string
  order_index: number
}

export default function DashboardLinksPage() {
  const router = useRouter()
  const supabase = supabaseBrowser()

  const [links, setLinks] = useState<Link[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔒 AUTH KONTROL + LİNKLERİ ÇEK
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      const { data, error } = await supabase
        .from('links')
        .select('id, title, url, order_index')
        .order('order_index', { ascending: true })

      if (!error && data) {
        setLinks(data)
      }
    }

    init()
  }, [router, supabase])

  // ➕ LINK EKLE
  const addLink = async () => {
    if (!title || !url) return

    setLoading(true)

    const { error } = await supabase.from('links').insert({
      title,
      url,
    })

    if (!error) {
      setTitle('')
      setUrl('')

      const { data } = await supabase
        .from('links')
        .select('id, title, url, order_index')
        .order('order_index', { ascending: true })

      if (data) setLinks(data)
    } else {
      alert(error.message)
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
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
        <button onClick={addLink} disabled={loading}>
          {loading ? 'Ekleniyor…' : 'Ekle'}
        </button>
      </div>

      {/* LİSTE */}
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <strong>{link.title}</strong> — {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
