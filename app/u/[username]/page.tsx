import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function PublicProfilePage({ params }: any) {
  const supabase = await createSupabaseServer()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, display_name, bio')
    .eq('username', params.username)
    .single()

  if (!profile) notFound()

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id)
    .eq('is_active', true)
    .order('position')

  return (
    <main style={{ padding: 40 }}>
      <h1>{profile.display_name || profile.username}</h1>
      <p>{profile.bio}</p>

      <ul>
        {links?.map(link => (
          <li key={link.id}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
