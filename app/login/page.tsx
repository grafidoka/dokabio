'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendLink = async () => {
    await supabaseBrowser.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
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
