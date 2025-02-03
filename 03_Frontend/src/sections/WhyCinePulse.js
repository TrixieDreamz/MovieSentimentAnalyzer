import React from "react";
import "../styles/WhyCinePulse.css"; // Import the styles

const WhyCinePulse = () => {
    return (
        <section className="why-section">
            <h2>Why CinePulse?</h2>
            <div className="features-container">
                <div className="feature-card">
                    <span className="feature-icon">🎬</span>
                    <h3>Track Movies Currently Playing</h3>
                    <p>Stay updated with the latest movies and what's trending.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">📝</span>
                    <h3>Search Movie Reviews from Moviegoers Like You</h3>
                    <p>See what others think about movies before you watch them.</p>
                </div>
                <div className="feature-card">
                    <span className="feature-icon">🤖</span>
                    <h3>Smart AI Insights</h3>
                    <p>AI-powered sentiment analysis to understand audience reactions.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyCinePulse;
