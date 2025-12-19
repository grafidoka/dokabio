'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const supabase = createSupabaseBrowser()

  const sendLink = async () => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <div>
      <h1>Giriş Yap</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendLink}>Link Gönder</button>
    </div>
  )
}
