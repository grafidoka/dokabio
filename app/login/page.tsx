'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace('/dashboard/links')
      } else {
        setChecking(false)
      }
    })
  }, [router])

  if (checking) return null // flash engelle

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
    <div style={{ maxWidth: 400, margin: '80px auto' }}>
      <h1>Giriş Yap</h1>

      {sent ? (
        <p>Mailini kontrol et.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={sendMagicLink}>Magic Link Gönder</button>
        </>
      )}
    </div>
  )
}
