'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendLink = async () => {
    const supabase = supabaseBrowser()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (!error) setSent(true)
  }

  return (
    <div>
      <h1>Giriş</h1>

      {sent ? (
        <p>Mail gönderildi. Linke tıklayın.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Mail adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendLink}>Magic Link Gönder</button>
        </>
      )}
    </div>
  )
}
