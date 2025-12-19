'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  // 🔑 MAGIC LINK SONRASI HASH'I TEMİZLE + SESSION KONTROL
  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        // HASH (#) TEMİZLENİR
        window.history.replaceState(null, '', '/dashboard/links')
        router.replace('/dashboard/links')
      }
    }

    handleAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        window.history.replaceState(null, '', '/dashboard/links')
        router.replace('/dashboard/links')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const sendMagicLink = async () => {
    if (!email) return

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    setSent(true)
  }

  return (
    <div style={{ maxWidth: 420, margin: '80px auto' }}>
      <h1>Login</h1>

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
