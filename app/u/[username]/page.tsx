import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Link = {
  id: string
  title: string
  url: string
}

export default async function PublicProfilePage({
  params
}: {
  params: { username: string }
}) {
  const { username } = params

  // 1️⃣ USER BUL
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', username)
    .single()

  if (!profile) notFound()

  // 2️⃣ LINKLERİ ÇEK
  const { data: links } = await supabase
    .from('links')
    .select('id, title, url')
    .eq('user_id', profile.id)
    .eq('is_active', true)
    .order('position', { ascending: true })

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
      <h1>@{profile.username}</h1>

      <div style={{ marginTop: 24 }}>
        {links?.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '12px',
              marginBottom: '12px',
              border: '1px solid #ddd',
              borderRadius: 8,
              textDecoration: 'none'
            }}
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  )
}
