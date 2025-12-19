'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function UsernamePage() {
  const supabase = createSupabaseBrowser()
  const [username, setUsername] = useState('')

  const saveUsername = async () => {
    await supabase.from('profiles').update({ username })
  }

  return (
    <div>
      <h1>Kullanıcı Adı</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />

      <button onClick={saveUsername}>Kaydet</button>
    </div>
  )
}
