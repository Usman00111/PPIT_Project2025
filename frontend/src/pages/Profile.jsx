import { useAuth } from "../context/AuthContext";

export default function Profile(){
  const { user } = useAuth();

  if (!user) {
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
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Account Number:</strong> {user.accountNumber}</p>
    </div>
  );
}
