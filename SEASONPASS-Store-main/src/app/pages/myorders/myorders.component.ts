import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserStore } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  user!: User | null;
  myOrders: any[] = [];
  OrdersTransaction: any[] = [];

  constructor(
    private userService: UserStore
  ) { }

  ngOnInit(): void {
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
      if (!this.user) {
        const userFromLocalStorage = localStorage.getItem('User');
        if (userFromLocalStorage) {
          this.user = JSON.parse(userFromLocalStorage);
        }
      }
      if (this.user) {
        this.userService.Myorder(this.user.id).subscribe(data => {
          this.myOrders = data;
          this.OrdersTransaction = this.OrdersByDateTransacted(this.myOrders);
        });
      }
    });
  }

  OrdersByDateTransacted(orders: any[]): any[] {
    const groupedOrders = orders.reduce((acc, order) => {
      const date = order.orderedIn;
      const paymentMethod = order.paymentMethod;
  
      if (!acc[date]) {
        acc[date] = {};
      }
  
      if (!acc[date][paymentMethod]) {
        acc[date][paymentMethod] = [];
      }
  
      acc[date][paymentMethod].push(order);
      return acc;
    }, {});
  
    const result = [];
    for (const date in groupedOrders) {
      if (groupedOrders.hasOwnProperty(date)) {
        const paymentGroups = groupedOrders[date];
        for (const paymentMethod in paymentGroups) {
          if (paymentGroups.hasOwnProperty(paymentMethod)) {
            result.push({
              date,
              paymentMethod,
              orders: paymentGroups[paymentMethod]
            });
          }
        }
      }
    }
  
    return result;
  }

  calculateTotalPrice(orders: any[]): number {
    let total = 0; // Initialize the total outside the loop

    for (let order of orders) {
        total += order.price * order.quantity;
    }

    return total;
  }
  cancelTransaction(orderedIn: string, paymentMethod: string): void {
    const OrderDetails = {
      orderedIn: orderedIn,
      paymentMethod: paymentMethod,
      userId: this.user ? this.user.id : null
    }
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
    this.userService.CancelOrder(OrderDetails).subscribe(data => {
      this.myOrders = data;
      this.OrdersTransaction = this.OrdersByDateTransacted(this.myOrders);
      Toast.fire({
        icon: 'success',
        title: 'Transaction Cancelled'
      })
    })
  }


}
