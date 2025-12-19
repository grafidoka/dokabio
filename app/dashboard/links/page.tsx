'use client'

import { useState, useTransition } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

export default function DashboardLinksPage() {
  const supabase = createSupabaseBrowserClient()

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleAddLink = () => {
    setError('')
    setSuccess('')

    if (!title || !url) {
      setError('Başlık ve URL zorunlu')
      return
    }

    startTransition(async () => {
      // 1️⃣ Kullanıcıyı al
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('Kullanıcı bulunamadı')
        return
      }

      // 2️⃣ En büyük position’ı bul
      const { data: lastLink } = await supabase
        .from('links')
        .select('position')
        .eq('user_id', user.id)
        .order('position', { ascending: false })
        .limit(1)
        .maybeSingle()

      const nextPosition = lastLink ? lastLink.position + 1 : 1

      // 3️⃣ Link ekle
      const { error: insertError } = await supabase.from('links').insert({
        user_id: user.id,
        title,
        url,
        position: nextPosition,
        is_active: true,
      })

      if (insertError) {
        setError('Link eklenirken hata oluştu')
        return
      }

      setTitle('')
      setUrl('')
      setSuccess('Link eklendi 🎉')
    })
  }

  return (
    <main style={{ padding: 24, maxWidth: 480 }}>
      <h1>Link Ekle</h1>

      <input
        type="text"
        placeholder="Link başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 12 }}
      />

      <input
        type="url"
        placeholder="https://"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', marginBottom: 12 }}
      />

      <button onClick={handleAddLink} disabled={isPending}>
        {isPending ? 'Ekleniyor…' : 'Link Ekle'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: 12 }}>{error}</p>
      )}

      {success && (
        <p style={{ color: 'green', marginTop: 12 }}>{success}</p>
      )}
    </main>
  )
}
