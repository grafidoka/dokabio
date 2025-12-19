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
        emailRedirectTo:
          `${window.location.origin}/api/auth/callback`,
      },
    })

    setSent(true)
  }

  return (
    <div>
      <h1>Giriş Yap</h1>

      {sent ? (
        <p>Mail gönderildi. Linke tıkla.</p>
      ) : (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <button onClick={sendLink}>Link Gönder</button>
        </>
      )}
    </div>
  )
}
