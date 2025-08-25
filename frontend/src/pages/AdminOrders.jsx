import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiGetAuth, apiPutAuth } from "../lib/api";

export default function AdminOrders(){
  const { user } = useAuth();

  //security check: only admins can access this page
  if (!user || user.role !== "admin") return <div>Not authorized.</div>;

  //state for orders list + loading flag
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all orders from backend
  async function load(){
    try {
      const data = await apiGetAuth("/orders");
      setList(data);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  // run load() once when component mounts
  useEffect(()=>{ load(); }, []);

  // change status of a single order (admin only)
  async function changeStatus(id, status){
    try {
      setLoading(true);
      await apiPutAuth(`/orders/${id}/status`, { status }); // update in backend
      await load(); // refresh list after update
    } catch {
      alert("Failed to update status (admin only).");
      setLoading(false);
    }
  }

  // show loading state while fetching
  if (loading) return <div><h2>Admin: Orders</h2><p>Loading…</p></div>;

  return (
    <div>
      <h2>Admin: Orders</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th>Order ID</th>
              <th>Placed</th>
              <th>Items (qty)</th>
              <th>Total</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {list.map(o => (
              <tr key={o._id} style={{ borderBottom: "1px solid #f3f3f3" }}>
                <td>{o._id}</td>
                {/* format timestamp */}
                <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</td>
                {/* show only quantities here for simplicity */}
                <td>{(o.items || []).map(i => `${i.quantity}x`).join(", ")}</td>
                <td>€{Number(o.total).toFixed(2)}</td>
                <td>{o.status}</td>
                <td>
                  {/* dropdown lets admin change order status */}
                  <select 
                    defaultValue={o.status} 
                    onChange={(e)=>changeStatus(o._id, e.target.value)}
                  >
                    <option value="placed">placed</option>
                    <option value="paid">paid</option>
                    <option value="shipped">shipped</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {/* fallback row when no orders exist */}
            {list.length === 0 && (
              <tr><td colSpan="6">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
