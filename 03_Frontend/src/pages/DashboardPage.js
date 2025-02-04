import React, { useState, useEffect } from "react";
import "../styles/DashboardPage.css"; // Import styles

const DashboardPage = ({ user }) => {
    const [activeFeature, setActiveFeature] = useState("searchMovies");
    const [searchQuery, setSearchQuery] = useState(""); 
    const [searchResults, setSearchResults] = useState([]); 
    const [trackedMovies, setTrackedMovies] = useState([]); 
    const [error, setError] = useState(null);

    // Fetch tracked movies when switching to "Tracked Movies"
    useEffect(() => {
        if (user && activeFeature === "trackedMovies") {
            fetchTrackedMovies();
        }
    }, [user, activeFeature]);
    

    // Function to handle search input
    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) return;

        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/movies/search/?query=${searchQuery}`);
            if (!response.ok) throw new Error("Failed to fetch movies");

            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            setError("Error fetching movies. Please try again.");
            console.error(error);
        }
    };

    // Fetch tracked movies from backend
    const fetchTrackedMovies = async () => {
        try {
            const response = await fetch("/api/movies/tracked/");
            if (!response.ok) throw new Error("Failed to fetch tracked movies");

            const data = await response.json();
            setTrackedMovies(data);
        } catch (error) {
            console.error("Error fetching tracked movies:", error);
        }
    };

    // Toggle tracking status for a movie
    const toggleTrackedMovie = async (movie) => {
        const isTracked = trackedMovies.some((tracked) => tracked.movie_id === movie.id);

        if (isTracked) {
            // Remove movie from tracked list
            await fetch(`/api/movies/tracked/remove/${movie.id}/`, { method: "DELETE" });
            setTrackedMovies(trackedMovies.filter((tracked) => tracked.movie_id !== movie.id));
        } else {
            // Add movie to tracked list
            await fetch("/api/movies/tracked/add/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    movie_id: movie.id, // Ensure consistency
                    title: movie.title,
                    release_year: movie.release_year,
                    avg_rating: movie.avg_rating,
                    genre: movie.genre,
                    poster_url: movie.poster_url,
                }),
            });

            setTrackedMovies([...trackedMovies, { ...movie, movie_id: movie.id }]); // Update state instantly
        }
    };

    // Select correct movie list
    const moviesToShow = activeFeature === "trackedMovies" ? trackedMovies : searchResults;

    return (
        <div className="dashboard-container">
            {/* Sidebar - User Actions */}
            <div className="dashboard-sidebar">
                <h2>Welcome, {user?.username}!</h2>
                <ul className="dashboard-list">
                    <li onClick={() => setActiveFeature("searchMovies")}>🔍 Search Movies</li>
                    <li onClick={() => setActiveFeature("trackedMovies")}>📌 Tracked Movies</li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="dashboard-content">
                <h2>{activeFeature === "trackedMovies" ? "📌 Your Tracked Movies" : "🔍 Search for Movies"}</h2>

                {activeFeature === "searchMovies" && (
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
                )}

                {/* Display search results or tracked movies */}
                <div className="search-results">
                    {moviesToShow.length > 0 ? (
                        moviesToShow.map((movie) => (
                            <div key={movie.id} className="movie-card">
                                <img src={movie.poster_url} alt={movie.title} className="movie-poster"/>
                                <h4>{movie.title}</h4>
                                <p><strong>Release Year:</strong> {movie.release_year || "Unknown"}</p>
                                <p><strong>Average Rating:</strong> {movie.avg_rating}</p>
                                <p><strong>Genres:</strong> {movie.genre || "N/A"}</p>

                                {/* Track Movie Checkbox */}
                                <div className="track-movie">
                                    <input
                                        type="checkbox"
                                        checked={trackedMovies.some((t) => t.movie_id === movie.id)}
                                        onChange={() => toggleTrackedMovie(movie)}
                                    />
                                    <label>Track Movie</label>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No movies found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
