import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

export default async function DashboardLinksPage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .order('position', { ascending: true })

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Linklerim</h1>

      <ul>
        {links?.map(link => (
          <li key={link.id}>
            <strong>{link.title}</strong> – {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
