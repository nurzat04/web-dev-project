from django.http import JsonResponse
from .models import Book, User, Category, Genre, Rating, CartItem, Favorite
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from .serializers import BookSerializer, UserSerializer, CartSerializer, RateSerializer
from django.db.models import Count, Avg

def list_books(request):
    books = Book.objects.all()
    data = {
        'books': list(books.values())
    }
    return JsonResponse(data)
def list_users(request):
    users = User.objects.all()
    data = {
        'users': list(users.values())
    }
    return JsonResponse(data)
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        
        if not (username and password and email):
            return JsonResponse({'error': 'All fields are required'}, status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken'}, status=400)
        
        new_user = User.objects.create(username=username, password=password, email=email)
        
        return JsonResponse({'success': 'User created successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
def list_categories(request):
    categories = Category.objects.all()
    data = {
        'categories': list(categories.values())
    }
    #data = [{'id': category.id, 'name': category.name} for category in categories]

    return JsonResponse(data, safe=False)

def get_book(request,pk):
    book = get_object_or_404(Book, pk=pk)
    serializer = BookSerializer(book)
    return JsonResponse(serializer.data)


def books_by_category(request, id):
    category = get_object_or_404(Category, pk=id)
    books = Book.objects.filter(category=category)
    data = [{'id': books.id, 'title': books.title, 'author': books.author, 'published_date': books.published_date,
             'description': books.description, 'price': books.price, 'quantity': books.quantity,
            'category': books.category.name, 'image': books.image}for books in books]
    return JsonResponse(data, safe=False)
def list_genres(request):
    genres = Genre.objects.all()
    data = {
        'genres': list(genres.values())
    }
    return JsonResponse(data)
def categories_by_genre(request, id):
    genre = get_object_or_404(Genre, pk=id)
    categories = Category.objects.filter(genre=genre)
    data = [{'id': cate.id, 'name': cate.name}for cate in categories]
    return JsonResponse(data, safe=False)
@csrf_exempt
def update_password(request, user_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_password = data.get('new_password')
        
        if not new_password:
            return JsonResponse({'error': 'New password is required'}, status=400)
        
        user = get_object_or_404(User, pk=user_id)
        #user.password = make_password(new_password)  # Hash the new password
        user.password = new_password
        user.save()
        
        return JsonResponse({'success': 'Password updated successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
@csrf_exempt
def update_username(request, user_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_username = data.get('new_username')

        if not new_username:
            return JsonResponse({'error': 'New username is required'}, status=400)

        user = get_object_or_404(User, pk=user_id)
        user.username = new_username
        user.save()

        return JsonResponse({'success': 'Username updated successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
@csrf_exempt
def update_email(request, user_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_email = data.get('new_email')

        if not new_email:
            return JsonResponse({'error': 'New email is required'}, status=400)

        user = get_object_or_404(User, pk=user_id)
        user.email = new_email
        user.save()

        return JsonResponse({'success': 'Email updated successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def get_user(request,pk):
    user= get_object_or_404(User, pk=pk)
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)

def get_cart(request,pk):
    cart = get_object_or_404(CartItem, pk=pk)
    serializer = CartSerializer(cart)
    return JsonResponse(serializer.data)
def list_cart(request):
    carts = CartItem.objects.all()
    data = {
        'carts': list(carts.values())
    }
    return JsonResponse(data)
@csrf_exempt
def add_book_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        book_id = data.get('book_id')
        quantity = data.get('quantity')
        user_id = data.get('user_id')

        if not (book_id and quantity and user_id):
            return JsonResponse({'error': 'All fields are required'}, status=400)

        book = get_object_or_404(Book, pk=book_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the item is already in the cart
        existing_item = CartItem.objects.filter(user=user, book=book).first()
        if existing_item:
            # If the item already exists, update its quantity
            existing_item.quantity += quantity
            existing_item.save()
        else:
            # If the item is not in the cart, create a new CartItem
            CartItem.objects.create(user=user, book=book, quantity=quantity)

        return JsonResponse({'success': 'Book added to cart successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
def list_cart_items(request, user_id):
    # Retrieve the user object based on the user_id provided
    user = get_object_or_404(User, pk=user_id)

    # Retrieve cart items associated with the user
    cart_items = CartItem.objects.filter(user=user)

    # Construct the JSON response data
    data = {
        'cart_items': [
            {
                'book_id': item.book.id,
                'book_title': item.book.title,
                'quantity': item.quantity,
                'price_per_item': item.book.price,
                'total_price': item.quantity * item.book.price
            }
            for item in cart_items
        ]
    }

    # Return the JSON response
    return JsonResponse(data)

@csrf_exempt
def remove_book_from_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        book_id = data.get('book_id')
        user_id = data.get('user_id')

        if not (book_id and user_id):
            return JsonResponse({'error': 'Both book_id and user_id are required'}, status=400)

        book = get_object_or_404(Book, pk=book_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the item exists in the cart
        cart_item = CartItem.objects.filter(user=user, book=book).first()
        if cart_item:
            # If the item exists, delete it from the cart
            cart_item.delete()
            return JsonResponse({'success': 'Book removed from cart successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Book not found in the cart'}, status=404)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
@csrf_exempt
def rate_book(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        book_id = data.get('book_id')
        rating = data.get('rating')
        comment = data.get('comment')
        user_id = data.get('user_id')

        if not (book_id and rating and comment and user_id):
            return JsonResponse({'error': 'All fields are required'}, status=400)
        book = get_object_or_404(Book, pk=book_id)
        user = get_object_or_404(User, pk=user_id)

        existing_item = Rating.objects.filter(user=user, book=book).first()
        if existing_item:
            existing_item.comment = comment
            existing_item.save()            
        else:
            Rating.objects.create(user=user, book=book, rating=rating, comment=comment)
        
        return JsonResponse({'success': 'Book has rated successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def list_ratings(request):
    if request.method == 'GET':
        ratings = Rating.objects.values('book').annotate(
            total_ratings=Count('book'),
            average_rating=Avg('rating'),
            comments=Count('comment', distinct=True),
        )
        data = []
        for rating in ratings:
            book_id = rating['book']
            total_ratings = rating['total_ratings']
            average_rating = round(rating['average_rating'], 2) if rating['average_rating'] is not None else None
            comments_count = rating['comments']

            # Fetch comments for the book
            comments = Rating.objects.filter(book_id=book_id).exclude(comment__isnull=True).values_list('comment', flat=True)

            data.append({
                'book_id': book_id,
                'total_ratings': total_ratings,
                'average_rating': average_rating,
                'comments_count': comments_count,
                'comments': list(comments)  # Convert QuerySet to list for JSON serialization
            })
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)


def get_book_ratings(request, book_id):
    if request.method == 'GET':
        # Retrieve ratings for the specified book ID
        ratings = Rating.objects.filter(book_id=book_id).select_related('user')

        
        # Check if ratings exist for the given book ID
        if ratings.exists():
            # Calculate total ratings and average rating
            total_ratings = ratings.count()
            average_rating = ratings.aggregate(avg_rating=Avg('rating'))['avg_rating']
            # comments = ratings.exclude(comment__isnull=True).values_list('comment', flat=True)
            comments = [{'user': rating.user.username, 'comment': rating.comment, 'rating': rating.rating} for rating in ratings if rating.comment]
            # Construct response data
            data = {
                'book_id': book_id,
                'total_ratings': total_ratings,
                'average_rating': round(average_rating, 2) if average_rating is not None else None,
                'comments': comments
            }
            return JsonResponse(data)
        else:
            return JsonResponse({'error': 'No ratings found for the specified book ID'}, status=404)
    else:
        return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)
    
@csrf_exempt
def add_to_favorites(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        book_id = data.get('book_id')
        user_id = data.get('user_id')

        if not (book_id and user_id):
            return JsonResponse({'error': 'Both book_id and user_id are required'}, status=400)

        book = get_object_or_404(Book, pk=book_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the book is already in the user's favorites
        existing_favorite = Favorite.objects.filter(user=user, book=book).first()
        if existing_favorite:
            return JsonResponse({'error': 'Book already exists in favorites'}, status=400)

        # Create a new favorite entry
        Favorite.objects.create(user=user, book=book)
        
        return JsonResponse({'success': 'Book added to favorites successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    

def list_fav(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    fav_items = Favorite.objects.filter(user=user)
    data = {
        'fav_items':[
            {
                'book_title': item.book.title,
                'author': item.book.author,
            }
            for item in fav_items
        ]
    }
    return JsonResponse(data)
