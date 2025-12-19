'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const finishLogin = async () => {
      const supabase = supabaseBrowser()

      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        console.error('Session alınamadı', error)
        router.replace('/login')
        return
      }

      // ✅ Session başarıyla oluştu
      router.replace('/dashboard/links')
    }

    finishLogin()
  }, [router])

  return <p>Giriş yapılıyor...</p>
}
