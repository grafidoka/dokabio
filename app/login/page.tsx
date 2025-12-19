'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const supabase = createSupabaseBrowser()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function sendLink() {
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
        <p>Mail gönderildi.</p>
      ) : (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendLink}>Link Gönder</button>
        </>
      )}
    </div>
  )
}