'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async () => {
    const { error } = await supabaseBrowser.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://dokabio.com/api/auth/callback'
      }
    })

    if (!error) setSent(true)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap</h1>

      {sent ? (
        <p>Mail gönderildi. Linke tıkla.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Link Gönder</button>
        </>
      )}
    </div>
  )
}
