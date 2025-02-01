import React, { useState } from "react";
import { searchMovie } from "./services/api";

function App() {
    const [movieTitle, setMovieTitle] = useState("");
    const [movie, setMovie] = useState(null);

    const handleSearch = async () => {
        if (movieTitle.trim() === "") return;
        const data = await searchMovie(movieTitle);
        setMovie(data);
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Movie Search</h1>
            <input
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="Enter movie title..."
            />
            <button onClick={handleSearch}>Search</button>

            {movie ? (
                <div style={{ marginTop: "20px" }}>
                    <h2>{movie.title} ({movie.release_date?.split("-")[0]})</h2>
                    <p><strong>Genre:</strong> {movie.genre_ids?.join(", ") || "N/A"}</p>
                    <p><strong>Rating:</strong> {movie.vote_average}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    {movie.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: "300px", borderRadius: "10px" }}
                        />
                    )}
                </div>
            ) : (
                <p>No movie found.</p>
            )}
        </div>
    );
}

export default App;
