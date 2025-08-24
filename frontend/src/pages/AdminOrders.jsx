import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiGet } from "../lib/api";

export default function AdminOrders(){
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <div>Not authorized.</div>;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load(){
    try {
      const data = await apiGet("/orders");
      setList(data);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ load(); }, []);

  if (loading) return <div><h2>Admin: Orders</h2><p>Loading…</p></div>;

  return (
    <div>
      <h2>Admin: Orders</h2>
      <p>Fetched {list.length} order(s).</p>
    </div>
  );
}