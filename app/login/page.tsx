'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendLink = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })
    setSent(true)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap</h1>

      {sent ? (
        <p>📩 Mail gönderildi</p>
      ) : (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <br />
          <button onClick={sendLink}>Link Gönder</button>
        </>
      )}
    </div>
  )
}
