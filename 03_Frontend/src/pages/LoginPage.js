import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");  // 🔹 State for email
    const [password, setPassword] = useState("");  // 🔹 State for password

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("🚀 Login button clicked!");

        console.log("📌 Email:", email);
        console.log("📌 Password:", password);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // 🔹 Check if the response is JSON before parsing
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("❌ Response is not JSON! Check the backend URL.");
            }

            const data = await response.json();
            console.log("✅ Response:", data);

            if (response.ok) {
                alert("Login Successful: " + data.username);
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
                    onChange={(e) => setEmail(e.target.value)}  // 🔹 Update state
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // 🔹 Update state
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;

