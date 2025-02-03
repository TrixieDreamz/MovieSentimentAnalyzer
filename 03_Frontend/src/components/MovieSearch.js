import React, { useState } from "react";
import "../styles/MovieSearch.css"; // Make sure this exists

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/movies/search/?query=${query}`);
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div className="search-container">
            <h3>🔍 Search for Movies</h3>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter movie name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <div key={index} className="movie-result">
                            🎬 {movie.title} ({movie.year})
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
