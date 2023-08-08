import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartItem  } from 'src/app/models/cart.model';
import { UserStore } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  user!: User | null;
  checkoutForm!: FormGroup;
  cart: Cart = { items: [] };
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private userStore: UserStore,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      recipientName: ['', Validators.required],
      Address: ['', Validators.required],
      paymentMethod: ['Credit Card', Validators.required],
      creditCardNumber: [''],
      paypalNumber: [''],
      gcashNumber: [''],
    });
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
    this.userStore.getUserObservable().subscribe((user) => {
      this.user = user;
    });
  }
  onSubmit() {
    const combinedData = {
      dataSource: this.dataSource,
      user: this.user,
      checkoutForm: this.checkoutForm.value
    };
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      customClass: {
        container: 'custom-toast-container', // Add your custom class here
        title: 'custom-toast-title'
      }
    })
  
    this.userStore.setCombinedData(combinedData);
    this.userStore.UserCheckout().subscribe(
      response =>{
        this.userStore.setTransaction(response)
        Toast.fire({
          icon: 'success',
          title: 'Orders Submitted'
        })
        this.cartService.clearCart()
        this.router.navigate(['myOrders'])
      },
      error =>{
        console.log(error)
      }
    )
  }
  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }
  itemtotal(items: CartItem): number {
    return this.cartService.getTotalquantity(items);
  }
  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

}
