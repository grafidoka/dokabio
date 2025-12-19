import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

function normalizeUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const supabase = await createSupabaseServerClient()

  // 1️⃣ Profili bul
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .maybeSingle()

  if (!profile) {
    notFound()
  }

  // 2️⃣ Linkleri getir
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id)
    .eq('is_active', true)
    .order('position', { ascending: true })

  return (
    <main style={{ padding: 24, maxWidth: 480 }}>
      <h1>@{profile.username}</h1>

      <p>Dokabio profil sayfası</p>

      <hr style={{ margin: '24px 0' }} />

      {links && links.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {links.map((link) => {
            const href = normalizeUrl(link.url)

            return (
              <li key={link.id} style={{ marginBottom: 12 }}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: 12,
                    border: '1px solid #444',
                    borderRadius: 6,
                    textDecoration: 'none',
                  }}
                >
                  {link.title}
                </a>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>Henüz link eklenmemiş.</p>
      )}
    </main>
  )
}
