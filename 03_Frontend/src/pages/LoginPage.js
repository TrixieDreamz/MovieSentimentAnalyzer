import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("🚀 Login button clicked!");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("✅ Response:", data);

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data));  // 🔹 Store user persistently
                setUser(data);  // 🔹 Update state
                navigate("/");  // 🔹 Redirect to home page
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("⚠️ Login error:", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
