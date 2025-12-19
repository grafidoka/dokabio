'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendMagicLink = async () => {
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
    <div style={{ maxWidth: 420, margin: '80px auto' }}>
      <h1>Giriş Yap</h1>

      {sent ? (
        <p>Mailini kontrol et.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Mail adresin"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={sendMagicLink}>Magic Link Gönder</button>
        </>
      )}
    </div>
  )
}
