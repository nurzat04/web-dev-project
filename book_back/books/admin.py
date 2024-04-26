# In books/admin.py
from django.contrib import admin
from .models import Book, User, Category, Genre, Rating, CartItem, Favorite

admin.site.register(Book)
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Genre)
admin.site.register(Rating)
admin.site.register(CartItem)
admin.site.register(Favorite)

