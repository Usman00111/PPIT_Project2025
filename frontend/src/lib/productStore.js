// this is a  Very simple localStorage-backed product store for development purposes.
// Starts with products.json on first load, then persists locally.

import initial from "../data/products.json";

const KEY = "admin_products";

export function getProducts() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  // first time: seed/start from products.json
  try {
    localStorage.setItem(KEY, JSON.stringify(initial));
  } catch {}
  return initial;
}

export function saveProducts(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

export function addProduct(p) {
  const list = getProducts();
  const withId = { ...p, id: p.id || ("p" + Math.random().toString(36).slice(2, 8)) };
  const next = [withId, ...list];
  saveProducts(next);
  return withId;
}



