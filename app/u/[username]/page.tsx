import { supabaseServer } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function PublicProfile({
  params,
}: {
  params: { username: string }
}) {
  const supabase = await supabaseServer()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single()

  if (!profile) notFound()

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id)

  return (
    <div style={{ padding: 32 }}>
      <h1>@{params.username}</h1>

      <ul>
        {links?.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
