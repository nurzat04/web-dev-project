import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

export interface Book {
  id: number;
  title: string;
  author: string;
  published_date: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}
interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  created_at: string;
}
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  isDropdownOpen: boolean = false;
  searchTitle: string = ''; // To store the input value
  booksJson: Book[] = [];
  books: Book[] = [];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Assuming you have a method in your AuthService to check login status
  }
  getBooks() {
    if (this.searchTitle.trim() !== '') { // Check if search title is not empty
      this.http.get<any>("http://127.0.0.1:8000/books/books-list/")
        .subscribe(
          (data) => {
            this.booksJson = data.books;
            this.filterBooks();
          },
          (error) => {
            console.error('An error occurred:', error);
          }
        );
    } else {
      this.books = []; // Clear books array when search title is empty
    }
  }
  filterBooks() {
    const searchTerm = this.searchTitle.replace(/\s|\d/g, '').toLowerCase();
    this.books = this.booksJson.filter(book =>
      book.title.replace(/\s|\d/g, '').toLowerCase().includes(searchTerm) ||
      book.author.replace(/\s|\d/g, '').toLowerCase().includes(searchTerm)
    );
    if (this.books.length < 1) {
      alert("No books found...");
    }
  }

  // resetBooksList() {
  //   this.books = [];
  //   this.searchTitle = '';
  // }
  // goBack() {
  //   this.resetBooksList();
  // }
  logout() {
    this.authService.logout(); // Call AuthService.logout() to logout the user
  }

}