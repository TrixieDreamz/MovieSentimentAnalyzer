import React from "react";
import { Link } from "react-router-dom";
import "../styles/HeroSection.css"; // Import the CSS file
import HappyMovieGoers from "../assets/HappyMovieGoers.png"; // Background image

const HeroSection = () => {
    return (
        <section className="hero-section">
            {/* Dark Overlay for readability */}
            <div className="hero-overlay"></div>

            {/* Hero Content */}
            <div className="hero-content">
                <h1>Welcome to CinePulse</h1>
                <p>Discover movie trends, sentiment analysis, and AI-powered insights.</p>
                <Link to="/signup" className="hero-button">Get Started</Link>
            </div>
        </section>
    );
};

export default HeroSection;
