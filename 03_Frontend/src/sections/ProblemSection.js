import React from "react";
import "../styles/ProblemSection.css"; // Import the styles
import ConfusedCouple from "../assets/ConfusedCouple.png"; // Background image

const ProblemSection = () => {
    return (
        <section className="problem-section">
            {/* Dark Overlay for readability */}
            <div className="problem-overlay"></div>

            {/* Problem Content */}
            <div className="problem-content">
                <h2>Ever stuck arguing with your significant other about what to watch?</h2>
                <p>
                    Tired of endlessly scrolling through Netflix, Amazon, or other streaming services, unsure about which movies are good and bad?  
                </p>
            </div>
        </section>
    );
};

export default ProblemSection;
