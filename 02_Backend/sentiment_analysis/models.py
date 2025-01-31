import uuid
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    release_year = models.IntegerField()
    avg_rating = models.FloatField()
    genre = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class SentimentAnalysis(models.Model):
    movie_title = models.CharField(max_length=255)
    review_text = models.TextField()
    sentiment_score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.movie_title} - {self.sentiment_score}"

class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    movie = models.ForeignKey("Movie", on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")  # Use the custom User model
    author = models.CharField(max_length=255)
    content = models.TextField()
    sentiment_score = models.FloatField()

    def __str__(self):
        return f"{self.movie.title} - {self.author}"
