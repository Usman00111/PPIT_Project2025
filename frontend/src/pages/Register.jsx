import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register(){
  const nav = useNavigate();
  //pull both register (real) and registerStub (fallback)
  const { register, registerStub } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //make async and call real register if present
  async function onSubmit(e){
    e.preventDefault();
    if (!name || !email || !password) return;

    try {
      let u;
      if (typeof register === "function") {
        // real backend call (returns { token, user })
        u = await register(name, email, password);
      } else if (typeof registerStub === "function") {
        // fallback to stub if you haven’t switched AuthContext yet
        u = registerStub(name, email);
      } else {
        throw new Error("No register method available");
      }

      // both paths provide user with accountNumber
      alert(`Welcome ${u.name}! Your Account Number is ${u.accountNumber}`);
      nav("/");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </label>
        <label>Password
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </label>
        <button type="submit">Create Account</button>
      </form>
      <p style={{ marginTop: 8 }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
