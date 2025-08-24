const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


function authHeaders() {
  try {
    const token = localStorage.getItem("auth_token") || "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch { 
    return {}; 
  }
}
export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body, withAuth = false) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    headers: { ...(withAuth ? authHeaders() : {}) }
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
  return apiGet("/auth/me");
}

