import { useEffect, useState } from "react";
import { getProducts } from "../lib/productStore";

export default function AdminProducts() {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(getProducts());
    }, []);

    return (
    <div>
      <h2>Admin: Products</h2>

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
                    <button>Delete</button>
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
