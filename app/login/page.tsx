'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendLink = async () => {
    if (!email) return

    await supabaseBrowser.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    setSent(true)
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto' }}>
      <h1>Login</h1>

      {sent ? (
        <p>Mail gönderildi.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={sendLink}>Magic Link Gönder</button>
        </>
      )}
    </div>
  )
}
