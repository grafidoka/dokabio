'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleLogin = async () => {
    if (!email) return

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 400 }}>
      <h1>Giriş yap</h1>

      {sent ? (
        <p>Mailine giriş linki gönderildi.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="email adresin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
          />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Gönderiliyor…' : 'Giriş linki gönder'}
          </button>
        </>
      )}
    </main>
  )
}
