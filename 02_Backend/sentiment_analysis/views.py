from rest_framework import generics
from .models import Movie, Review, SentimentAnalysis
from .serializers import MovieSerializer, ReviewSerializer, SentimentAnalysisSerializer
import requests
from django.http import JsonResponse
from ApiKey import TMDb_API_KEY
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt




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
    
@csrf_exempt
def search_movies(request):
    """Search for movies using an external API and return formatted results."""
    query = request.GET.get('query', '')

    if not query:
        return JsonResponse({"error": "Query parameter is required"}, status=400)

    # Fetch movies from TMDb API
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
            formatted_results.append({
                "id": movie.get("id"),
                "title": movie.get("title"),
                "release_year": movie.get("release_date", "")[:4],  # Extract only the year
                "avg_rating": movie.get("vote_average", "N/A"),
                "genre": ", ".join([str(genre_id) for genre_id in movie.get("genre_ids", [])]),  # Convert genre IDs to string
                "poster_url": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
            })

        return JsonResponse({"results": formatted_results}, safe=False)
    else:
        return JsonResponse({"error": "Failed to fetch data"}, status=response.status_code)




