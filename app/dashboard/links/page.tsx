'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function DashboardLinksPage() {
  const supabase = createSupabaseBrowser()
  const [url, setUrl] = useState('')

  const addLink = async () => {
    await supabase.from('links').insert({ url })
    setUrl('')
  }

  return (
    <div>
      <h1>Links</h1>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Link"
      />

      <button onClick={addLink}>Ekle</button>
    </div>
  )
}
