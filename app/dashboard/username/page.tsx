'use client'

import { useState, useTransition } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

export default function UsernamePage() {
  const supabase = createSupabaseBrowserClient()

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSave = () => {
    setError('')
    setSuccess('')

    if (!username) {
      setError('Username boş olamaz')
      return
    }

    startTransition(async () => {
      // 1️⃣ Mevcut kullanıcıyı al
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('Kullanıcı bulunamadı')
        return
      }

      // 2️⃣ Username başka biri tarafından alınmış mı?
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .neq('id', user.id)
        .maybeSingle()

      if (existing) {
        setError('Bu username zaten alınmış')
        return
      }

      // 3️⃣ Güncelle
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id)

      if (updateError) {
        setError('Kaydedilirken hata oluştu')
        return
      }

      setSuccess('Username güncellendi 🎉')
    })
  }

  return (
    <main style={{ padding: 24, maxWidth: 400 }}>
      <h1>Username Ayarla</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', marginBottom: 12 }}
      />

      <button onClick={handleSave} disabled={isPending}>
        {isPending ? 'Kaydediliyor…' : 'Kaydet'}
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
