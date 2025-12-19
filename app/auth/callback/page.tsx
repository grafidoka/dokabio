'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const finalizeAuth = async () => {
      // URL'deki code → session'a çevrilir
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error) {
        console.error('Auth callback error:', error)
        router.replace('/login')
        return
      }

      // ✅ Session OK → dashboard
      router.replace('/dashboard/links')
    }

    finalizeAuth()
  }, [router])

  return (
    <div style={{ padding: 40 }}>
      <h2>Giriş yapılıyor…</h2>
    </div>
  )
}
