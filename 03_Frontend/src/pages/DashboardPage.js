import React, { useState } from "react";
import "../styles/DashboardPage.css"; // Import styles

const DashboardPage = ({ user }) => {
    const [activeFeature, setActiveFeature] = useState("default");
    const [searchQuery, setSearchQuery] = useState(""); // Store user input for movie search
    const [searchResults, setSearchResults] = useState([]); // Store fetched movie data
    const [error, setError] = useState(null); // Error handling

    // Function to handle search input
    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) return; // Prevent empty searches

        setError(null); // Reset error before making a new request

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/movies/search/?query=${searchQuery}`);
            if (!response.ok) throw new Error("Failed to fetch movies");

            const data = await response.json();

            // Ensure correct data structure
            setSearchResults(data.results || []);
        } catch (error) {
            setError("Error fetching movies. Please try again.");
            console.error("Error fetching movies:", error);
        }
    };

    // Function to render content dynamically
    const renderFeatureContent = () => {
        switch (activeFeature) {
            case "searchMovies":
                return (
                    <div className="feature-content">
                        <h3>🔍 Search for Movies</h3>
                        <form onSubmit={handleSearch} className="search-form">
                            <input 
                                type="text" 
                                placeholder="Enter movie name..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-button">Search</button>
                        </form>

                        {/* Display search results or error */}
                        {error && <p className="error-message">{error}</p>}

                        <div className="search-results">
                            {searchResults.length > 0 ? (
                                searchResults.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        {movie.poster_url ? (
                                            <img src={movie.poster_url} alt={movie.title} className="movie-poster"/>
                                        ) : (
                                            <div className="no-poster">No Image Available</div>
                                        )}
                                        <h4>{movie.title}</h4>
                                        <p><strong>Release Year:</strong> {movie.release_year || "Unknown"}</p>
                                        <p><strong>Average Rating:</strong> {movie.avg_rating}</p>
                                        <p><strong>Genres:</strong> {movie.genre || "N/A"}</p>
                                    </div>
                                ))
                            ) : (
                                !error && <p>No results found.</p>
                            )}
                        </div>
                    </div>
                );
            default:
                return <div className="chart-placeholder">📊 <strong>Chart Area</strong> <p>Data visualizations will appear here.</p></div>;
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar - User Actions */}
            <div className="dashboard-sidebar">
                <h2>Welcome, {user?.username}!</h2>
                <p>What would you like to do today?</p>
                <ul className="dashboard-list">
                    <li onClick={() => setActiveFeature("searchMovies")}>🔍 Search Movies</li>
                    <li onClick={() => setActiveFeature("trackMovies")}>🎬 Track Movies</li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="dashboard-content">
                <h2>Analytics & Insights</h2>
                {renderFeatureContent()}
            </div>
        </div>
    );
};

export default DashboardPage;
