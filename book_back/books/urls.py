# In books/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('books-list/', views.list_books, name='list_books'),
    path('users-list/', views.list_users, name='list_users'),
    path('signup/', views.signup, name='signup'),
    path('category-list/', views.list_categories, name='list_categories'),
    path('book/<int:pk>/', views.get_book, name='get_book'),
    path('categories/<int:id>/books/', views.books_by_category, name='books_by_category'),
    path('genre/', views.list_genres, name='list_genres'),
    path('genres/<int:id>/categories', views.categories_by_genre, name='categories_by_genre'),
    path('update_password/<int:user_id>/', views.update_password, name='update_password'),
    path('users/<int:pk>/', views.get_user),
    path('add-book-to-cart/', views.add_book_to_cart, name='add_to_cart'),
    path('cart-list/', views.list_cart),
    path('cart/<int:user_id>/', views.list_cart_items, name='list_cart_items'),
    path('remove_book_from_cart/', views.remove_book_from_cart, name='remove_book_from_cart'),
    path('update_name/<int:user_id>/', views.update_username, name='update_name'),
    path('update_email/<int:user_id>/', views.update_email, name='update_email'),
    path('rate_book/', views.rate_book),
    path('ratings/', views.list_ratings, name='list_ratings'),
    path('get_rate/<int:book_id>/', views.get_book_ratings),
    path('add-favorite-book/', views.add_to_favorites),
    path('list_fav/<int:user_id>/', views.list_fav),

]
