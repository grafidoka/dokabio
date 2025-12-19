'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendLink = async () => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    setSent(true)
  }

  return (
    <div>
      {sent ? (
        <p>Mail gönderildi</p>
      ) : (
        <>
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={sendLink}>Magic Link</button>
        </>
      )}
    </div>
  )
}
