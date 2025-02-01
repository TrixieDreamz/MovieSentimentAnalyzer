import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Set logged-in user
                navigate("/"); // Redirect to home
            } else {
                alert("Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
