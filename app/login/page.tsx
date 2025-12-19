"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async () => {
    if (!email) {
      setMessage("Email gir");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://dokabio.com/api/auth/callback",
      },
    });

    if (error) {
      console.error(error);
      setMessage("Hata oluştu");
    } else {
      setMessage("Mail gönderildi, kontrol et 📩");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Giriş Yap</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 12 }}
      />

      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Gönderiliyor..." : "Link Gönder"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
