import { useEffect, useState } from "react";
import { addProduct, getProducts, deleteProduct } from "../lib/productStore";


export default function AdminProducts() {
    const [list, setList] = useState([]);

    const [f, setF] = useState({ name: "", price: "", imageUrl: "", stock: "", description: "" });

    function onChange(e) {
        const { name, value } = e.target;
        setF(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        setList(getProducts());
    }, []);

    return (
        <div>
            <h2>Admin: Products</h2>

            <section>
                <h3>Add Product</h3>
                <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 8, maxWidth: 520 }}>
                    <label>Name
                        <input name="name" value={f.name} onChange={onChange} required />
                    </label>
                    <label>Price (€)
                        <input name="price" type="number" step="0.01" value={f.price} onChange={onChange} required />
                    </label>
                    <label>Image URL
                        <input name="imageUrl" value={f.imageUrl} onChange={onChange} placeholder="https://..." />
                    </label>
                    <label>Stock
                        <input name="stock" type="number" value={f.stock} onChange={onChange} required />
                    </label>
                    <label>Description
                        <textarea name="description" value={f.description} onChange={onChange} rows={3} />
                    </label>
                    <section>
                        <h3>Add Product</h3>
                        <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 8, maxWidth: 520 }}>
                            <label>Name
                                <input name="name" value={f.name} onChange={onChange} required />
                            </label>
                            <label>Price (€)
                                <input name="price" type="number" step="0.01" value={f.price} onChange={onChange} required />
                            </label>
                            <label>Image URL
                                <input name="imageUrl" value={f.imageUrl} onChange={onChange} placeholder="https://..." />
                            </label>
                            <label>Stock
                                <input name="stock" type="number" value={f.stock} onChange={onChange} required />
                            </label>
                            <label>Description
                                <textarea name="description" value={f.description} onChange={onChange} rows={3} />
                            </label>

                            <div>
                                <button type="button" onClick={() => {
                                    const p = {
                                        name: f.name.trim(),
                                        price: Number(f.price || 0),
                                        imageUrl: f.imageUrl.trim(),
                                        stock: Number(f.stock || 0),
                                        description: f.description
                                    };
                                    if (!p.name || !p.price) return alert("Name and price are required.");
                                    addProduct(p);
                                    setList(getProducts());
                                    setF({ name: "", price: "", imageUrl: "", stock: "", description: "" });
                                    alert("Product added.");
                                }}>
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </section>

                </form>
            </section>

            <section style={{ marginTop: 8 }}>
                <h4>Live Preview</h4>
                <div className="card" style={{ maxWidth: 260 }}>
                    <img
                        src={f.imageUrl || "https://via.placeholder.com/300?text=Preview"}
                        alt={f.name || "Preview"}
                        style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }}
                    />
                    <h3 style={{ margin: "8px 0" }}>{f.name || "Product Name"}</h3>
                    <div style={{ fontWeight: 700 }}>
                        {f.price ? `€${Number(f.price).toFixed(2)}` : "€0.00"}
                    </div>
                    <div style={{ color: "#555", fontSize: 14 }}>
                        Stock: {f.stock || 0}
                    </div>
                    <button disabled type="button" title="Disabled in admin preview">Add to Cart</button>
                </div>
            </section>


            <section style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 8 }}>Products List</h3>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                                <th>Name</th><th>Price</th><th>Stock</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(p => (
                                <tr key={p.id} style={{ borderBottom: "1px solid #f3f3f3" }}>
                                    <td>{p.name}</td>
                                    <td>€{p.price.toFixed(2)}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <button>Edit</button>{" "}
                                        <button onClick={() => {
                                            if (!confirm(`Delete "${p.name}"?`)) return;
                                            deleteProduct(p.id);
                                            setList(getProducts());
                                        }}>Delete</button>

                                    </td>
                                </tr>
                            ))}
                            {list.length === 0 && (
                                <tr><td colSpan="4">No products yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
