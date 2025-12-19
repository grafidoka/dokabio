'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://dokabio.com/auth/callback',
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Magic link mail adresine gönderildi.')
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <h1>Giriş</h1>

        <input
          type="email"
          placeholder="E-posta adresin"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: 10,
            borderRadius: 6,
            border: '1px solid #333',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 10,
            borderRadius: 6,
            border: 'none',
            background: '#7c3aed',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Gönderiliyor…' : 'Magic Link Gönder'}
        </button>

        {message && <p style={{ fontSize: 14 }}>{message}</p>}
      </form>
    </div>
  )
}
