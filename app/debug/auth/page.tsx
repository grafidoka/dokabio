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

      result.url = window.location.href
      result.hash = window.location.hash

      const sessionRes = await supabase.auth.getSession()
      result.session = sessionRes

      const userRes = await supabase.auth.getUser()
      result.user = userRes

      const ls: any = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) ls[key] = localStorage.getItem(key)
      }
      result.localStorage = ls

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
