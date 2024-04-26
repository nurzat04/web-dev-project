import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';

interface Genre {
  id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
  genre: string;
}

interface Book {
  showRate: any;
  id: number;
  title: string;
  author: string;
  published_date: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre: Genre[] = [];
  selectedGenre: Genre | null = null;
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  books: Book[] = [];
  selectedBook: Book | null = null;
  book: Book | null = null;
  quantity: number = 1; // 默认数量为1
  rates: any = {};
  constructor(private http: HttpClient, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getGenres();
  }
  selectGenre(g: Genre): void {
    this.selectedGenre = g;
    this.getCategoriesByGenre(g.id);
  }
  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.getBooksByCategory(category.id);
  }
  selectBook(book: Book): void {
    this.selectedBook = book;
    this.getBookRatings(book.id)
  }


  getGenres() {
    this.http.get<any>("http://127.0.0.1:8000/books/genre/")
      .subscribe(
        (data) => {
          this.genre = data.genres;
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }
  getCategoriesByGenre(genreId: number) {
    this.http.get<any>("http://127.0.0.1:8000/books/genres/" + genreId + "/categories")
      .subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }
  getBooksByCategory(categoryId: number) {
    this.http.get<any>("http://127.0.0.1:8000/books/categories/" + categoryId + "/books/")
      .subscribe(
        (data) => {
          this.books = data;
          console.log(this.books);
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }
  getBookDetails(bookId: number) {
    this.http.get<Book>("http://127.0.0.1:8000/books/book/" + bookId + "/")
      .subscribe(
        (data) => {
          this.book = data;
        },
        (error) => {
          alert("no");
        }
      );
  }
  openBookDetails(book: Book): void {
    this.selectedBook = book;
  }

  closeBookDetails(): void {
    this.book = null;
    this.showCart = false;
  }
  showCart: boolean = false; // Variable to control the visibility of the cart
  quantities!: number;
  // Function to toggle the visibility of the cart
  toggleCartVisibility() {
    this.showCart = !this.showCart;
  }
  addToCart(bookId: number) {
    if (!bookId || !this.quantities) {
      alert('All fields are required');
      return;
    }

    if (!this.authService.userId) {
      alert('User is not logged in');
      return;
    }

    this.cartService.addToCart(bookId, this.quantities)
      .subscribe(
        response => {
          alert('Book added to cart successfully');
          console.log(response);
          console.log(this.authService.userId);
        },
        error => {
          console.error(error);
          alert('Error adding book to cart');
        }
      );
  }
  toggleRateVisibility(item: any) {
    item.showRate = !item.showRate; // Toggle showRate for the clicked item
  }

  getBookRatings(bookId: number){
    this.http.get<any>("http://127.0.0.1:8000/books/get_rate/" + bookId + "/")
      .subscribe(
        (data) => {
          this.rates = data;
          this.rates.forEach((item:any) => {
            item.showRate = false;
          })
        }
      );
  }
  addToFavo(bookId: number){
    if (!bookId) {
      alert('All fields are required');
      return;
    }

    if (!this.authService.userId) {
      alert('User is not logged in');
      return;
    }

    this.cartService.addToFav(bookId)
      .subscribe(
        response => {
          alert('Book added to cart successfully');
          console.log(response);
          console.log(this.authService.userId);
        },
        error => {
          console.error(error);
          alert('Error adding book to cart');
        }
      );
  }
}
