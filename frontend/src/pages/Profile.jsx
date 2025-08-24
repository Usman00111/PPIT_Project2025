import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiAuthMe } from "../lib/api";

export default function Profile(){
  const { user } = useAuth();
  const [me, setMe] = useState(user);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const u = await apiAuthMe();
        if (mounted) setMe(u);
      } catch {
        if (mounted) setMe(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (!user) load(); 
    return () => { mounted = false; };
  }, [user]);

  if (loading) {
    return (
      <div>
        <h2>Profile</h2>
        <p>Loading…</p>
      </div>
    );
  }

  if (!me) {
    return (
      <div>
        <h2>Profile</h2>
        <p>Please log in.</p>
      </div>
    );
  }

  return (
  <div>
    <h2>Profile</h2>
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 6, maxWidth: 480 }}>
      <p><strong>Name:</strong> {me.name}</p>
      <p><strong>Email:</strong> {me.email}</p>
      <p><strong>Account Number:</strong> {me.accountNumber}</p>
    </div>
  </div>
);
}
