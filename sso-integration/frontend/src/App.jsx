import { Link, Route, Routes, useLocation } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

function Home() {
  const loginUrl = `${API_BASE}/auth/login`
  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 680, margin: '40px auto', lineHeight: 1.6 }}>
      <h1>React + Python SSO Demo</h1>
      <p>Klik tombol di bawah untuk login lewat SSO (OIDC).</p>
      <a href={loginUrl}>
        <button type="button">Login with SSO</button>
      </a>
    </main>
  )
}

function AuthCallback() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const idToken = params.get('id_token')
  const accessToken = params.get('access_token')

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '40px auto', lineHeight: 1.6 }}>
      <h1>SSO Callback</h1>
      <p>Token berhasil diterima dari backend.</p>
      <h3>ID Token</h3>
      <textarea readOnly rows={8} style={{ width: '100%' }} value={idToken || 'Tidak ada id_token'} />
      <h3>Access Token</h3>
      <textarea readOnly rows={8} style={{ width: '100%' }} value={accessToken || 'Tidak ada access_token'} />
      <p>
        <Link to="/">Kembali ke Home</Link>
      </p>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  )
}
