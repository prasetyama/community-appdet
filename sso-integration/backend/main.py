import os
from typing import Any, Dict
from urllib.parse import urlencode

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

app = FastAPI(title="SSO Backend (OIDC)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OIDC_ISSUER = os.getenv("OIDC_ISSUER", "https://accounts.google.com")
CLIENT_ID = os.getenv("OIDC_CLIENT_ID", "")
CLIENT_SECRET = os.getenv("OIDC_CLIENT_SECRET", "")
REDIRECT_URI = os.getenv("OIDC_REDIRECT_URI", "http://localhost:8000/auth/callback")
FRONTEND_CALLBACK = os.getenv("FRONTEND_CALLBACK", "http://localhost:5173/auth/callback")


async def fetch_discovery() -> Dict[str, Any]:
    discovery_url = f"{OIDC_ISSUER.rstrip('/')}/.well-known/openid-configuration"
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(discovery_url)
        response.raise_for_status()
    return response.json()


@app.get("/health")
async def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/auth/login")
async def login(state: str = "react-client") -> RedirectResponse:
    if not CLIENT_ID:
        raise HTTPException(status_code=500, detail="OIDC_CLIENT_ID belum diatur")

    discovery = await fetch_discovery()
    params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "scope": "openid profile email",
        "redirect_uri": REDIRECT_URI,
        "state": state,
        "prompt": "select_account",
    }
    auth_url = f"{discovery['authorization_endpoint']}?{urlencode(params)}"
    return RedirectResponse(auth_url)


@app.get("/auth/callback")
async def callback(request: Request, code: str = "", state: str = "") -> RedirectResponse:
    if not code:
        raise HTTPException(status_code=400, detail="Code tidak ditemukan dari provider SSO")

    discovery = await fetch_discovery()
    token_payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    async with httpx.AsyncClient(timeout=10) as client:
        token_res = await client.post(discovery["token_endpoint"], data=token_payload)

    if token_res.status_code >= 400:
        raise HTTPException(status_code=400, detail=token_res.text)

    token_json = token_res.json()
    id_token = token_json.get("id_token")
    access_token = token_json.get("access_token")

    if not id_token:
        raise HTTPException(status_code=400, detail="id_token tidak diterima")

    redirect_params = urlencode(
        {
            "id_token": id_token,
            "access_token": access_token or "",
            "state": state,
        }
    )
    return RedirectResponse(f"{FRONTEND_CALLBACK}?{redirect_params}")


@app.get("/auth/userinfo")
async def userinfo(access_token: str) -> Dict[str, Any]:
    discovery = await fetch_discovery()

    async with httpx.AsyncClient(timeout=10) as client:
        userinfo_res = await client.get(
            discovery["userinfo_endpoint"],
            headers={"Authorization": f"Bearer {access_token}"},
        )

    if userinfo_res.status_code >= 400:
        raise HTTPException(status_code=400, detail=userinfo_res.text)

    return userinfo_res.json()
