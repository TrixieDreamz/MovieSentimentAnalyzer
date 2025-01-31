from django.contrib import admin
from .models import Movie, Review, SentimentAnalysis

# Register models so they appear in Django Admin
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year', 'avg_rating', 'genre')
    search_fields = ('title', 'genre')
    list_filter = ('release_year', 'genre')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('movie', 'user', 'author', 'sentiment_score')
    search_fields = ('movie__title', 'author')
    list_filter = ('sentiment_score',)

@admin.register(SentimentAnalysis)
class SentimentAnalysisAdmin(admin.ModelAdmin):
    list_display = ('movie_title', 'sentiment_score', 'created_at')
    search_fields = ('movie_title',)
    list_filter = ('sentiment_score',)
