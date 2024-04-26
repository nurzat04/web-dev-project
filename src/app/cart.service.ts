import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://127.0.0.1:8000/books'; // Your Django backend base URL

  constructor(private authService: AuthService, private http: HttpClient) {}

  addToCart(bookId: number, quantity: number) {
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `${this.baseUrl}/add-book-to-cart/`;
    const body = { book_id: bookId, quantity: quantity, user_id: userId };
    return this.http.post(url, body);
  }
  removeFromCart(bookId: number) {
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `${this.baseUrl}/remove_book_from_cart/`;
    const body = { book_id: bookId, user_id: userId };
    return this.http.post(url, body);
  }

  getCartItems() {
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `${this.baseUrl}/cart/${userId}/`;
    return this.http.get(url);
  }
  getUsername(){
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `${this.baseUrl}/users/${userId}/`;
    return this.http.get(url);
  }

  ratebook(bookId: number, rating: number, comment: string){
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `${this.baseUrl}/rate_book/`;
    const body = {book_id: bookId, rating: rating, comment: comment, user_id: userId};
    return this.http.post(url, body);
  }
  addToFav(bookId: number){
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `${this.baseUrl}/add-favorite-book/`;
    const body = { book_id: bookId, user_id: userId };
    return this.http.post(url, body);
  }
  getFav(){
    const userId = this.authService.userId; // Retrieve userId from AuthService
    const url = `${this.baseUrl}/list_fav/${userId}/`;
    return this.http.get(url);
  }

}
