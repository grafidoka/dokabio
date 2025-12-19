'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DebugAuthPage() {
  const [log, setLog] = useState<any>({})

  useEffect(() => {
    const run = async () => {
      const result: any = {}

      // 1️⃣ URL bilgisi
      result.url = window.location.href
      result.hash = window.location.hash

      // 2️⃣ Session kontrolü
      const sessionRes = await supabase.auth.getSession()
      result.session = sessionRes

      // 3️⃣ User kontrolü
      const userRes = await supabase.auth.getUser()
      result.user = userRes

      // 4️⃣ LocalStorage
      const ls: any = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) ls[key] = localStorage.getItem(key)
      }
      result.localStorage = ls

      // 5️⃣ Cookies
      result.cookies = document.cookie

      setLog(result)
    }

    run()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>AUTH DEBUG</h1>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          background: '#111',
          color: '#0f0',
          padding: 16,
        }}
      >
        {JSON.stringify(log, null, 2)}
      </pre>
    </div>
  )
}
