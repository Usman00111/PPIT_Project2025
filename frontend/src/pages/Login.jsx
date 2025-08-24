import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const nav = useNavigate();
    // use real login instead of loginStub
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // kept for UI purposes

    //make submit async and call real login, keep flow the same
    async function onSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        try {
            await login(email, password);
            nav("/");
        } catch (err) {
            alert("Login failed");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
                <label>Email
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
                </label>
                <label>Password
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                </label>
                <button type="submit">Login</button>
            </form>
            <p style={{ marginTop: 8 }}>No account? <Link to="/register">Register</Link></p>
        </div>
    );
}
