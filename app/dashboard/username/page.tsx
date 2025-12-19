'use client'

import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function UsernamePage() {
  const supabase = supabaseBrowser()
  const [username, setUsername] = useState('')

  return (
    <div>
      <h1>Username</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  )
}
