from rest_framework import generics, permissions
from .models import Movie, Review, SentimentAnalysis
from .serializers import MovieSerializer, ReviewSerializer, SentimentAnalysisSerializer
import requests
from django.http import JsonResponse
from ApiKey import TMDb_API_KEY
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import TrackedMovie
from .serializers import TrackedMovieSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response



# 🎬 Movie API Views


class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

# 📝 Review API Views
class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# 🔍 Sentiment Analysis API Views
class SentimentAnalysisListCreateView(generics.ListCreateAPIView):
    queryset = SentimentAnalysis.objects.all()
    serializer_class = SentimentAnalysisSerializer

class SentimentAnalysisDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SentimentAnalysis.objects.all()
    serializer_class = SentimentAnalysisSerializer

def fetch_movie_data(request, movie_title):
    """Fetch movie details from an external API."""
    base_url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": TMDb_API_KEY,
        "query": movie_title,
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        if data.get("results"):  # Check if results exist
            first_movie = data["results"][0]  # Get the first movie
            return JsonResponse(first_movie, safe=False)
        else:
            return JsonResponse({"error": "No movie found"}, status=404)
    else:
        return JsonResponse({"error": "Failed to fetch data"}, status=response.status_code)
    
GENRE_MAP = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
    99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
    27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
    10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
}

@csrf_exempt
def search_movies(request):
    """Search for movies using an external API and return formatted results."""
    query = request.GET.get('query', '')

    if not query:
        return JsonResponse({"error": "Query parameter is required"}, status=400)

    base_url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": TMDb_API_KEY,
        "query": query,
    }

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        formatted_results = []

        for movie in data.get("results", []):
            genre_names = [GENRE_MAP.get(genre_id, "Unknown") for genre_id in movie.get("genre_ids", [])]

            formatted_results.append({
                "id": movie.get("id"),
                "title": movie.get("title"),
                "release_year": movie.get("release_date", "")[:4],  # Extract only the year
                "avg_rating": movie.get("vote_average", "N/A"),
                "genre": ", ".join(genre_names),  # Convert list to string
                "poster_url": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
            })

        return JsonResponse({"results": formatted_results}, safe=False)
    else:
        return JsonResponse({"error": "Failed to fetch data"}, status=response.status_code)


# ✅ Get the list of movies tracked by the current user
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_tracked_movies(request):
    """Retrieve all tracked movies for the logged-in user."""
    tracked_movies = TrackedMovie.objects.filter(user=request.user)
    serializer = TrackedMovieSerializer(tracked_movies, many=True)
    return Response(serializer.data)

# ✅ Add a movie to the user's tracked movies
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_tracked_movie(request):
    data = request.data
    movie, created = TrackedMovie.objects.get_or_create(
        user=request.user,
        movie_id=data["movie_id"],
        defaults={
            "title": data["title"],
            "release_year": data["release_year"],
            "avg_rating": data["avg_rating"],
            "genre": data["genre"],
            "poster_url": data["poster_url"],
        }
    )
    return Response({"message": "Movie tracked successfully."})

# ✅ Remove a movie from tracked movies
@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def remove_tracked_movie(request, movie_id):
    movie = get_object_or_404(TrackedMovie, user=request.user, movie_id=movie_id)
    movie.delete()
    return Response({"message": "Movie untracked successfully."})



