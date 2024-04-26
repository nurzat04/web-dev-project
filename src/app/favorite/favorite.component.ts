import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favItems: any;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getFavItems();
  }

  getFavItems() {
    this.cartService.getFav().subscribe(
      (data: any) => {
        this.favItems = data;
      });
  }
}
