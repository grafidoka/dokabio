'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UsernameForm() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit() {
    setLoading(true)

    const res = await fetch('/api/set-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/dashboard/links')
    } else {
      const data = await res.json()
      alert(data.error || 'Hata oluştu')
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Kullanıcı Adı Seç</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="kullaniciadi"
      />

      <button onClick={submit} disabled={loading}>
        Kaydet
      </button>
    </div>
  )
}
