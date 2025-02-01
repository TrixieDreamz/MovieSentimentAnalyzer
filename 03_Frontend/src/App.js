import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
    const [user, setUser] = useState(null);

    // Fetch user authentication status when the app loads
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/users/user/");  // Updated URL
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    
        fetchUser();
    }, []);

    // Logout function
    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Router>
            {/* Navigation Bar */}
            <nav style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ccc" }}>
                <Link to="/" style={{ margin: "10px" }}>Home</Link>
                <Link to="/search" style={{ margin: "10px" }}>Search</Link>

                {/* Authentication Links */}
                {user ? (
                    <>
                        <span style={{ margin: "10px" }}>Hello, {user.username}!</span>
                        <button onClick={handleLogout} style={{ margin: "10px" }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
                        <Link to="/signup" style={{ margin: "10px" }}>Sign Up</Link>
                    </>
                )}
            </nav>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage setUser={setUser} />} />
                <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            </Routes>
        </Router>
    );
};

export default App;
