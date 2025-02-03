import React from "react";
import HeroSection from "../sections/HeroSection";
import WhyCinePulse from "../sections/WhyCinePulse";
import TrendingMovies from "../sections/TrendingMovies";
import ProblemSection from "../sections/ProblemSection"; 
import SolutionSection from "../sections/SolutionSection"; 

const HomePage = () => {
    return (
        <div className="main-content">
            <HeroSection />
            <WhyCinePulse />
            <TrendingMovies />
            <ProblemSection /> 
            <SolutionSection /> 
        </div>
    );
};

export default HomePage;
