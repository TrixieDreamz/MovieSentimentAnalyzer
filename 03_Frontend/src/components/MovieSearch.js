import React, { useState } from "react";
import "../styles/MovieSearch.css"; // Make sure this exists
import axios from "axios";

const MovieSearch = ({ onResults }) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/movies/search/`, {
                params: { query },
            });

            if (response.status === 200 && response.data.results) {
                console.log("API Response:", response.data);
                onResults(response.data.results); // Send results to parent component
            } else {
                setError("No results found.");
            }
        } catch (err) {
            setError("Error fetching data.");
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default MovieSearch;
