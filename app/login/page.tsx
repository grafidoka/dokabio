'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const supabase = createSupabaseBrowser()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const redirectUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/auth/callback'
        : 'https://dokabio.com/auth/callback'

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    })

    if (error) {
      console.error(error)
      setMessage('Bir hata oluştu. Lütfen tekrar dene.')
    } else {
      setMessage('Giriş linki mail adresine gönderildi.')
    }

    setLoading(false)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        <h1>Giriş Yap</h1>

        <input
          type="email"
          placeholder="E-posta adresin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Gönderiliyor…' : 'Magic Link Gönder'}
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  )
}
