import { useAuth } from "../context/AuthContext";

export default function AdminOrders(){
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <div>Not authorized.</div>;

  return (
    <div>
      <h2>Admin: Orders</h2>
      <p>Loading will appear here next…</p>
    </div>
  );
}