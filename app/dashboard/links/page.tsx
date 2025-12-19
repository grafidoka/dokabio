import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLinksPage() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: links, error } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div style={{ padding: 32, color: 'red' }}>
        DB Error: {error.message}
      </div>
    )
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Links</h1>

      {links.length === 0 && <p>Henüz link yok.</p>}

      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <strong>{link.title}</strong> — {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
