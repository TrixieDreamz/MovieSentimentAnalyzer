export const searchMoviesAPI = async (query) => {
    if (!query.trim()) return [];

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/movies/search/?query=${query}`);
        const data = await response.json();

        return response.ok && data.results ? data.results : [];
    } catch (err) {
        console.error("Error fetching movie data:", err);
        return [];
    }
};
