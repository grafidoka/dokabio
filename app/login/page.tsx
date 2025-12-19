'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    await supabaseBrowser().auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    setLoading(false)
    alert('Mail gönderildi')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Gönderiliyor...' : 'Link Gönder'}
      </button>
    </div>
  )
}
