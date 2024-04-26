# In books/models.py
from django.db import models
from django.utils import timezone

class Genre(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
class Category(models.Model):
    name = models.CharField(max_length=100)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    def __str__(self):
        return self.name 
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date = models.DateField()
    description = models.TextField()  
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    quantity = models.IntegerField()  
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.URLField()

    def __str__(self):
        return self.title

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
    
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField()  # 可以是 1-5 的整数，表示评分
    comment = models.TextField(blank=True, null=True)  # 用户的评价内容，可选
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)