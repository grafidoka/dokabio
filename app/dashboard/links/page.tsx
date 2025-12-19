'use client'

import { useState, useEffect } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function DashboardLinksPage() {
  const supabase = createSupabaseBrowser()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState<any[]>([])

  async function loadLinks() {
    const { data } = await supabase
      .from('links')
      .select('*')
      .order('position')

    setLinks(data || [])
  }

  useEffect(() => {
    loadLinks()
  }, [])

  async function addLink() {
    await supabase.from('links').insert({ title, url })
    setTitle('')
    setUrl('')
    loadLinks()
  }

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1>Linkler</h1>

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

      <ul>
        {links.map(link => (
          <li key={link.id}>{link.title}</li>
        ))}
      </ul>
    </main>
  )
}
