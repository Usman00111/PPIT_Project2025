// Base API URL — comes from .env (VITE_API_BASE_URL) or falls back to localhost
const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

//Ensure a unique cart ID exists for this browser (stored in localStorage)
function ensureCartId() {
  try {
    let cid = localStorage.getItem("cart_id");
    if (!cid) {
      // use modern crypto.randomUUID() if available, otherwise fallback to random string
      cid = (crypto && crypto.randomUUID) 
        ? crypto.randomUUID() 
        : Math.random().toString(36).slice(2);
      localStorage.setItem("cart_id", cid);
    }
    return cid;
  } catch {
    return "";
  }
}

// Helper to add Authorization header if user has a token
function authHeaders() {
  try {
    const token = localStorage.getItem("auth_token") || "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

// ===== Generic HTTP Helpers ==
// Each request includes "x-cart-id" so backend can track guest carts

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
      ...(withAuth ? authHeaders() : {}) // add JWT header if requested
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

// = Auth-specific helpers ===
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

// Convenience wrappers for auth-protected endpoints
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

export function apiPutAuth(path, body) {
  return apiPut(path, body, true); // same as apiPut but always with auth
}
