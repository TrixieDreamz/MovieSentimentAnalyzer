import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [username, setUsername] = useState(localStorage.getItem("username") || null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        setUsername(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername(null);
        navigate("/");  // Redirect to home page
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {username ? (
                    <>
                        <li>Welcome, {username}!</li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
