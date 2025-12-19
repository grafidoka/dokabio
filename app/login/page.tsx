// app/login/page.tsx
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const sendLink = async () => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://dokabio.com/auth/callback',
      },
    })
    setSent(true)
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Giriş</h1>

      {sent ? (
        <p>Mailine giriş linki gönderildi 📩</p>
      ) : (
        <>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendLink}>Magic Link Gönder</button>
        </>
      )}
    </div>
  )
}
