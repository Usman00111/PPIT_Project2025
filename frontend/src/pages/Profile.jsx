import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiAuthMe } from "../lib/api";

export default function Profile(){
  const { user } = useAuth(); // current user from context
  const [me, setMe] = useState(user); // local state to hold user details
  const [loading, setLoading] = useState(!user); // show loading only if no user info yet

  //ttry to fetch fresh user info from backend if not already in context
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const u = await apiAuthMe(); //   ask backend for user info
        if (mounted) setMe(u);
      } catch {
        if (mounted) setMe(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (!user) load(); ///only fetch if context has no user yet

    //cleanup in case component unmounts
    return () => { mounted = false; };
  }, [user]);

  //  while fetching data
  if (loading) {
    return (
      <div>
        <h2>Profile</h2>
        <p>Loading…</p>
      </div>
    );
  }

  // if not logged in
  if (!me) {
    return (
      <div>
        <h2>Profile</h2>
        <p>Please log in.</p>
      </div>
    );
  }

  // show profile info
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
