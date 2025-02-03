import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Import the logo
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = ({ user, handleLogout }) => {
    return (
        <nav className="navbar">
            {/* Logo on the left */}
            <Link to="/" className="navbar-logo">
                <img src={logo} alt="CinePulse Logo" />
            </Link>

            {/* Centered Navigation */}
            <div className="navbar-links">
                {user ? (
                    <>
                        <span className="navbar-user">Welcome, {user.username}!</span>
                        <button onClick={handleLogout} className="navbar-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-button">Login</Link>
                        <Link to="/signup" className="navbar-button">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
