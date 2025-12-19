'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function handleLogin() {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    if (!error) {
      setSent(true)
    } else {
      alert(error.message)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap</h1>

      {sent ? (
        <p>Mail gönderildi. Maildeki linke tıkla.</p>
      ) : (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Link Gönder</button>
        </>
      )}
    </div>
  )
}
