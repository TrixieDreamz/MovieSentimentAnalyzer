from rest_framework import generics
from .models import Movie, Review, SentimentAnalysis
from .serializers import MovieSerializer, ReviewSerializer, SentimentAnalysisSerializer
import requests
from django.http import JsonResponse
from ApiKey import TMDb_API_KEY


# 🎬 Movie API Views
class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

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


