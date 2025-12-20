import { getSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LinksPage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data: links, error } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('position', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Linkler</h1>

      <ul>
        {links?.map((link) => (
          <li key={link.id}>
            {link.title} — {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
