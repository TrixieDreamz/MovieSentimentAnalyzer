import React from "react";
import "../styles/SolutionSection.css"; // Import the styles
import HappyCouple from "../assets/HappyCouple.png"; // Background image

const SolutionSection = () => {
    return (
        <section className="solution-section">
            {/* Light Overlay */}
            <div className="solution-overlay"></div>

            {/* Solution Content */}
            <div className="solution-content">
                <h2>CinePulse Has You Covered!</h2>
                <p>
                    Let AI do the work! CinePulse helps you quickly find the best movies based on real audience sentiment. No more endless scrolling—just great recommendations.
                </p>
            </div>
        </section>
    );
};

export default SolutionSection;
