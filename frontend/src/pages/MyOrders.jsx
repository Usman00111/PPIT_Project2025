import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiGet } from "../lib/api";

export default function MyOrders(){
  const { user } = useAuth();
  if (!user) return <div>Please log in to view your orders.</div>;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      try {
        const data = await apiGet("/orders/mine");
        setList(data);
      } catch {
        setList([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {loading ? <p>Loading…</p> : <p>Loaded.</p>}
    </div>
  );
}
