import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
    const nav = useNavigate();
    const { loginStub } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // not used yet, kept for UI purposess

    function onSubmit(e) {
        e.preventDefault();
        if (!email) return;
        loginStub(email);
        nav("/");

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
