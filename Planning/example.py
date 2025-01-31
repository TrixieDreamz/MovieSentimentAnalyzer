import requests





def search_movie(movie_name):
    url = f"https://api.themoviedb.org/3/search/movie?query={movie_name}&api_key={API_KEY}"
    response = requests.get(url).json()
    
    if response["results"]:
        first_result = response["results"][0]
        return first_result["id"], first_result["title"], first_result["release_date"]
    else:
        return None
    

movie_id, title, release_date = search_movie("The Matrix")
print(f"Movie ID: {movie_id}, Title: {title}, Release Date: {release_date}")

def get_movie_reviews(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key={API_KEY}"
    response = requests.get(url).json()
    
    reviews = []
    for review in response.get("results", []):
        reviews.append({
            "author": review["author"],
            "content": review["content"]
        })
    
    return reviews

reviews = get_movie_reviews(movie_id)
for i, review in enumerate(reviews[:5]):  # Show first 5 reviews
    print(f"Review {i+1} by {review['author']}: {review['content']}\n")
