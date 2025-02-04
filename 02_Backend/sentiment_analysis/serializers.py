from rest_framework import serializers
from .models import Movie, Review, SentimentAnalysis, TrackedMovie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class SentimentAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentAnalysis
        fields = '__all__'

class TrackedMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackedMovie
        fields = '__all__'