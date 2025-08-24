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
        id: p.id || ("p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6))
    };

    const next = [withId, ...list];
    saveProducts(next);
    return withId;
}

export function updateProduct(id, patch) {
    const list = getProducts();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return list;
    const next = [...list];
    next[idx] = { ...next[idx], ...patch };
    saveProducts(next);
    return next[idx];
}

export function deleteProduct(id) {
    const list = getProducts();
    const next = list.filter(x => x.id !== id);
    saveProducts(next);
    return next;
}




