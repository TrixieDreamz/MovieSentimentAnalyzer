import React, { useEffect, useState } from "react";
import { fetchMovies } from "./services/api";

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function getMovies() {
            const data = await fetchMovies();
            setMovies(data);
        }
        getMovies();
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} ({movie.release_year})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
