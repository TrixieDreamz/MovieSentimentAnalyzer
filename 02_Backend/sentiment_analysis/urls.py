from django.urls import path
from .views import (
    MovieDetailView,
    ReviewListCreateView, ReviewDetailView,
    SentimentAnalysisListCreateView, SentimentAnalysisDetailView, fetch_movie_data, search_movies
)

urlpatterns = [
    # 🎬 Movie Endpoints
    path('movies/', MovieDetailView.as_view(), name='movie-list'),
    path('movies/<uuid:pk>/', MovieDetailView.as_view(), name='movie-detail'),

    # 📝 Review Endpoints
    path('reviews/', ReviewListCreateView.as_view(), name='review-list'),
    path('reviews/<uuid:pk>/', ReviewDetailView.as_view(), name='review-detail'),

    # 🔍 Sentiment Analysis Endpoints
    path('sentiment/', SentimentAnalysisListCreateView.as_view(), name='sentiment-list'),
    path('sentiment/<int:pk>/', SentimentAnalysisDetailView.as_view(), name='sentiment-detail'),

    path('external/movies/<str:movie_title>/', fetch_movie_data, name='fetch-movie-data'),
    path('movies/search/', search_movies, name='search-movies'),  # Add this line
    path('external/movies/<str:movie_title>/', fetch_movie_data, name='fetch-movie-data'),
]
