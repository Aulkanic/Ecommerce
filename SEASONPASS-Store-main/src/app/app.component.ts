import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './models/cart.model';
import { CartService } from './services/cart.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  cart: Cart = { items: [] };

  constructor(private cartService: CartService,private router: Router) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.showHeader = !['/login', '/signup'].includes(event.url);
      }
    });
  }
}
