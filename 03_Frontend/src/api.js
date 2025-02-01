export const searchMovie = async (title) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&api_key=YOUR_API_KEY`);
        if (!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        return data.results[0] || null; // Return the first movie found
    } catch (error) {
        console.error("Error fetching movie:", error);
        return null;
    }
};
