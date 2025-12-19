'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function UsernamePage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const saveUsername = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.auth.updateUser({
      data: { username },
    })

    router.push('/dashboard')
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Kullanıcı adını seç</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="örnek: grafidoka"
      />

      <br />
      <br />

      <button onClick={saveUsername} disabled={loading}>
        Devam Et
      </button>
    </main>
  )
}
