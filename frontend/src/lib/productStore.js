// this is a  Very simple localStorage-backed product store for development purposes.
// Starts with products.json on first load, then persists locally.

import initial from "../data/products.json";

const KEY = "admin_products";

export function getProducts() {
    try {
        const raw = localStorage.getItem(KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) { console.warn("getProducts: read/parse failed", e); }
    try {
        localStorage.setItem(KEY, JSON.stringify(initial));
    } catch (e) { console.warn("getProducts: seed failed", e); }

    // optional: re-read after seeding to keep the return source consistent
    try {
        const seeded = localStorage.getItem(KEY);
        if (seeded) return JSON.parse(seeded);
    } catch (e) { console.warn("getProducts: re-read after seed failed", e); }

    return initial;
}

export function saveProducts(list) {
    try {
        localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) { console.warn("saveProducts: write failed", e); }
}

export function addProduct(p) {
    const list = getProducts();
    const withId = {
        ...p,
        id: p.id || ("p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)),
        price: Number(p.price ?? 0),
        stock: Number(p.stock ?? 0)
    };

    // guard against NaN for price/stock (keep simple defaults)
    withId.price = Number.isNaN(withId.price) ? 0 : withId.price;
    withId.stock = Number.isNaN(withId.stock) ? 0 : withId.stock;

    const next = [withId, ...list];
    saveProducts(next);
    return withId;
}

export function updateProduct(id, patch) {
  const list = getProducts();
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null; // was 'list'; null makes "not found" clearer to read and better Customer experience 
  const next = [...list];
  const price = patch.price != null ? Number(patch.price) : next[idx].price;
  const stock = patch.stock != null ? Number(patch.stock) : next[idx].stock;
  next[idx] = { ...next[idx], ...patch, price, stock };

  // guard against NaN when updating numeric fields (fallback to previouss values)
  const current = next[idx];
  const safePrice = Number.isNaN(current.price) ? list[idx].price : current.price;
  const safeStock = Number.isNaN(current.stock) ? list[idx].stock : current.stock;
  next[idx] = { ...current, price: safePrice, stock: safeStock };

  saveProducts(next);
  return next[idx];
}

export function deleteProduct(id) {
    const list = getProducts();
    const next = list.filter(x => x.id !== id);
    saveProducts(next);
    return next;
}

// helper: read a single product by id
export function getProductById(id) {
    const list = getProducts();
    return list.find(x => x.id === id) || null;
}

// helper: reset local store back to initial JSON (hehlpful during dev phase)
export function resetProducts() {
    try {
        localStorage.setItem(KEY, JSON.stringify(initial));
    } catch (e) { console.warn("resetProducts: write failed", e); }
    return initial;
}
