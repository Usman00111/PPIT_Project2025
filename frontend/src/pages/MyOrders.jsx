import { useAuth } from "../context/AuthContext";

export default function MyOrders(){
  const { user } = useAuth();
  if (!user) return <div>Please log in to view your orders.</div>;

  return (
    <div>
      <h2>My Orders</h2>
      <p>Loading…</p>
    </div>
  );
}
