import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css"; // Import CSS for styling
import logo from "../assets/logo.png"; // Import logo

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup successful! You can now log in.");
                navigate("/login"); // Redirect to login page
            } else {
                setError(data.error); // Show error if registration fails
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError("An unexpected error occurred.");
        }
    };

    return (
        <div className="signup-container">
            {/* Logo */}
            <img src={logo} alt="CinePulse Logo" className="signup-logo" />

            {/* Signup Form */}
            <div className="signup-box">
                <h2>Create Your CinePulse Account</h2>
                {error && <p className="error-message">{error}</p>}
                
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
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                
                {/* Encouraging Sign-Up Message */}
                <p className="signup-message">
                    Join CinePulse today and unlock AI-powered insights into your favorite movies!  
                    No more endless scrolling – just the best recommendations.  
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
