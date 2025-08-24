const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function ensureCartId() {
  try {
    let cid = localStorage.getItem("cart_id");
    if (!cid) {
      cid = (crypto && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      localStorage.setItem("cart_id", cid);
    }
    return cid;
  } catch {
    return "";
  }
}

function authHeaders() {
  try {
    const token = localStorage.getItem("auth_token") || "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "x-cart-id": ensureCartId() }
  });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body, withAuth = false) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-cart-id": ensureCartId(),
      ...(withAuth ? authHeaders() : {})
    },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export async function apiPut(path, body, withAuth = false) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-cart-id": ensureCartId(),
      ...(withAuth ? authHeaders() : {})
    },
    body: JSON.stringify(body || {})
  });
  if (!res.ok) throw new Error(`PUT ${path} failed`);
  return res.json();
}

export async function apiDel(path, withAuth = false) {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers: {
      "x-cart-id": ensureCartId(),
      ...(withAuth ? authHeaders() : {})
    }
  });
  if (!res.ok) throw new Error(`DELETE ${path} failed`);
  return res.json();
}

export async function apiAuthRegister(name, email, password) {
  return apiPost("/auth/register", { name, email, password });
}

export async function apiAuthLogin(email, password) {
  return apiPost("/auth/login", { email, password });
}

export async function apiAuthMe() {
  const res = await fetch(`${BASE}/auth/me`, {
    headers: {
      "x-cart-id": ensureCartId(),
      ...authHeaders()
    }
  });
  if (!res.ok) throw new Error("ME failed");
  return res.json();
  
}
// GET with auth (JWT)
export async function apiGetAuth(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "x-cart-id": ensureCartId(),
      ...authHeaders()
    }
  });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

// PUT with auth (JWT) 
export function apiPutAuth(path, body) {
  return apiPut(path, body, true);
}
