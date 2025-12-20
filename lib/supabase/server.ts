import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function supabaseServer() {
  // 🔴 KRİTİK: Next.js 16 → cookies() ASYNC
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          cookieStore.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
}
