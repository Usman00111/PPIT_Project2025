import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const nav = useNavigate();
    const { login } = useAuth(); //real login function from AuthContext

    // local state for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // handle login form submission
    async function onSubmit(e) {
        e.preventDefault();
        if (!email || !password) return; // quick validation

        try {
            await login(email, password); // call backend via AuthContext
            nav("/"); // redirect to home on success
        } catch (err) {
            alert("Login failed"); // fallback error message
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form
                onSubmit={onSubmit}
                style={{ display: "grid", gap: 8, maxWidth: 360 }}
            >
                <label>Email
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                </label>
                <label>Password
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>

            {/* helpful link to registration page*/}
            <p style={{ marginTop: 8 }}>
                No account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
