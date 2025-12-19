'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function UsernamePage() {
  const supabase = createSupabaseBrowser()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 1️⃣ Kullanıcı login mi? Username var mı?
  useEffect(() => {
    const checkProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      if (profile?.username) {
        router.replace('/dashboard')
        return
      }

      setLoading(false)
    }

    checkProfile()
  }, [router, supabase])

  // 2️⃣ Username kaydet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const clean = username.trim().toLowerCase()

    if (!/^[a-z0-9_]{3,30}$/.test(clean)) {
      setError('Username 3–30 karakter olmalı (a–z, 0–9, _)')
      return
    }

    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Oturum bulunamadı')
      setSaving(false)
      return
    }

    const { error } = await supabase.from('profiles').insert({
      id: user.id,
      username: clean,
    })

    if (error) {
      if (error.code === '23505') {
        setError('Bu username alınmış')
      } else {
        setError(error.message)
      }
      setSaving(false)
      return
    }

    router.replace('/dashboard')
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Yükleniyor…</div>
  }

  return (
    <main style={{ padding: 40, maxWidth: 420 }}>
      <h1>Username Seç</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="kullanici_adi"
          disabled={saving}
          style={{
            width: '100%',
            padding: 10,
            marginTop: 16,
            marginBottom: 12,
          }}
        />

        {error && (
          <div style={{ color: 'red', marginBottom: 12 }}>
            {error}
          </div>
        )}

        <button disabled={saving} style={{ padding: 10 }}>
          {saving ? 'Kaydediliyor…' : 'Devam Et'}
        </button>
      </form>
    </main>
  )
}
