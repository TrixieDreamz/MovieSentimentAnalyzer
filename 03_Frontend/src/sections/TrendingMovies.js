import React from "react";
import "../styles/TrendingMovies.css"; // Import the styles

// Sample movie data (Replace with real API data later)
const trendingMovies = [
    { title: "Dune: Part Two", sentiment: "Positive", poster: "https://via.placeholder.com/150" },
    { title: "Oppenheimer", sentiment: "Very Positive", poster: "https://via.placeholder.com/150" },
    { title: "The Batman", sentiment: "Mixed", poster: "https://via.placeholder.com/150" },
    { title: "Spider-Man: No Way Home", sentiment: "Positive", poster: "https://via.placeholder.com/150" }
];

const TrendingMovies = () => {
    return (
        <section className="trending-section">
            <h2>Trending Movie Sentiment</h2>
            <div className="movies-container">
                {trendingMovies.map((movie, index) => (
                    <div key={index} className="movie-card">
                        <img src={movie.poster} alt={movie.title} className="movie-poster" />
                        <h3>{movie.title}</h3>
                        <p className={`sentiment-tag ${movie.sentiment.toLowerCase()}`}>{movie.sentiment}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingMovies;
