import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar"; // Import the Navbar component
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null; // 🔹 Load user from storage
    });

    // Fetch user authentication status when the app loads
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/users/user/", {
                    method: "GET",
                    credentials: "include",  // 🔹 Send session cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                } else {
                    console.log("User not authenticated");
                    setUser(null);
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
            await fetch("http://127.0.0.1:8000/api/users/logout/", { method: "POST" }); // 🔹 Ensure correct logout URL
            setUser(null);
            localStorage.removeItem("user");  // 🔹 Clear stored user
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Router>
            {/* 🔹 Use the Navbar globally */}
            <Navbar user={user} handleLogout={handleLogout} />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />  {/* 🔹 Pass `user` to HomePage */}
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage setUser={setUser} />} />
                <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            </Routes>
        </Router>
    );
};

export default App;
