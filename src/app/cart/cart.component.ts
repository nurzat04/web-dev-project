import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any;
  address: string = '';
  rating!: number;
  comment!: string;
  showAddress: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(
      (data: any) => {
        this.cartItems = data;
        // Initialize showRate property for each item
        this.cartItems.cart_items.forEach((item: any) => {
          item.showRate = false;
        });
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  removeFromCart(bookId: number) {
    this.cartService.removeFromCart(bookId).subscribe(
      (response: any) => {
        console.log('Book removed from cart:', response);
        this.getCartItems();
      },
      (error: any) => {
        console.error('Error removing book from cart:', error);
      }
    );
  }

  purchase() {
    console.log('Purchase button clicked!');
    console.log('Address:', this.address);
  }
  showAddressInput() {
    this.showAddress = true;
  }
  close(): void {
    this.showAddress = false;
  }
  toggleRateVisibility(item: any) {
    item.showRate = !item.showRate; // Toggle showRate for the clicked item
  }

  rateBook(item: any) {
    if(!item.book_id || !this.rating || !this.comment){
      alert('All fields are required');
      return;
    }
    if (!this.authService.userId) {
      alert('User is not logged in');
      return;
    }
    this.cartService.ratebook(item.book_id, this.rating, this.comment)
    .subscribe(
      response => {
        alert('Book rated successfully');
        console.log(response);
        console.log(this.authService.userId);
      },
      error => {
        console.error(error);
        alert('Error rating');
      }
    );
  }
}
