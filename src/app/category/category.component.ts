import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  cartItems: any;
  showAddress: boolean = false;
  address: string = '';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(
      (data: any) => {
        this.cartItems = data;
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
  showAddressInput() {
    this.showAddress = true;
  }
  close(): void {
    this.showAddress = false;
  }
  purchase() {
    // Implement purchase logic here
    console.log('Purchase button clicked!');
    console.log('Address:', this.address);
    // You can send the address and complete the purchase process here
  }

}
