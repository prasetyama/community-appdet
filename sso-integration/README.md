# SSO Integration Demo (Python + React)

Contoh integrasi SSO berbasis **OpenID Connect (OIDC)**:
- `backend/`: FastAPI untuk redirect ke provider SSO, tukar authorization code ke token, dan kirim token ke frontend.
- `frontend/`: React (Vite) client untuk trigger login dan menerima token callback.

## 1) Jalankan Backend (Python)

```bash
cd sso-integration/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

Isi nilai `OIDC_CLIENT_ID` dan `OIDC_CLIENT_SECRET` di `.env` sesuai aplikasi pada provider SSO.

## 2) Jalankan Frontend (React)

```bash
cd sso-integration/frontend
npm install
cp .env.example .env
npm run dev
```

## 3) Alur Login

1. User klik **Login with SSO** di React app (`/`).
2. Backend redirect ke provider OIDC (`/auth/login`).
3. Setelah sukses login, provider callback ke backend (`/auth/callback`).
4. Backend exchange code -> token, lalu redirect ke frontend (`/auth/callback?id_token=...&access_token=...`).

## Endpoint backend

- `GET /health`: healthcheck.
- `GET /auth/login`: mulai proses login SSO.
- `GET /auth/callback`: callback dari provider OIDC.
- `GET /auth/userinfo?access_token=...`: ambil profil user dari provider.
