import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export default async function DashboardLinksPage() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ⛔ Session yoksa asla DB'ye girme
  if (!user) {
    redirect('/login')
  }

  // 🔒 ŞİMDİ DB GÜVENLİ
  const { data: links, error } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('LINKS FETCH ERROR:', error.message)
    return <pre>Links yüklenemedi</pre>
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Links</h1>
      <pre>{JSON.stringify(links, null, 2)}</pre>
    </div>
  )
}
