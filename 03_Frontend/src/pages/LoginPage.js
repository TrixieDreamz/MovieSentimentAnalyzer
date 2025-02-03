import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // Import CSS for styling
import logo from "../assets/logo.png"; // Import logo

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
        <div className="login-container">
            {/* Logo */}
            <img src={logo} alt="CinePulse Logo" className="login-logo" />

            {/* Login Form */}
            <div className="login-box">
                <h2>Login to CinePulse</h2>
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
                    <button type="submit" className="login-button">Login</button>
                </form>
                
                {/* Forgot Password */}
                <p className="forgot-password" onClick={() => alert("Forgot password flow not implemented yet!")}>
                    Forgot Password?
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
