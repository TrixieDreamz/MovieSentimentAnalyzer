import axios from 'axios';

// Set up the base URL for API calls
const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // Django backend
    headers: {
        "Content-Type": "application/json",
    },
});

// Fetch all movies
export const fetchMovies = async () => {
    try {
        const response = await API.get("/movies/");
        console.log("Movies fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

// Fetch all reviews
export const fetchReviews = async () => {
    try {
        const response = await API.get("/reviews/");  
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
};

// Fetch a movie from Django (which calls TMDb)
export const searchMovie = async (movieTitle) => {
    try {
        const response = await API.get(`/external/movies/${movieTitle}/`);
        console.log("Movie fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        return null;
    }
};
