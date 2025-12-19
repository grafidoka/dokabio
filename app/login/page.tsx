"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://dokabio.com/api/auth/callback",
      },
    });
  };

  return (
    <div>
      <h1>Giriş Yap</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleLogin}>Link Gönder</button>
    </div>
  );
}
