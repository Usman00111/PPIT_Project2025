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

}