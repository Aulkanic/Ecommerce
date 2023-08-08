import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, mergeMap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { CartService } from './cart.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
  })

  export class UserStore {
    private readonly USER_BASE_URL = 'http://localhost:3006/api/ecommerce/User';

    private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private transactionDetails: any[] = [];
    private combinedData: any; 
    private Orders: any;

    constructor(private httpClient: HttpClient,private router: Router,private cart:CartService) {
      const storedUser = localStorage.getItem('User');
      if (storedUser) {
        this.userSubject = new BehaviorSubject<User | null>(JSON.parse(storedUser));
      } else {
        this.userSubject = new BehaviorSubject<User | null>(null);
      }
    }

    signup(name: string, mobilenum: string, email: string, password: string):Observable<any>{
        const signupData = {
            name: name,
            mobileNumber: mobilenum,
            email: email,
            password: password
        }
        return this.httpClient.post<any>(`${this.USER_BASE_URL}/Signup`,signupData);
      }
    login(email: string, password: string):Observable<any>{
        const loginData = {
            email: email,
            password: password,
          };
        return this.httpClient.post<any>(`${this.USER_BASE_URL}/login`, loginData);
      }
    logout(): void {
        this.router.navigate(['/login']);
        localStorage.removeItem('User');
        this.userSubject.next(null);
      }
    updateUser(user: User | null): void {
        this.userSubject.next(user);
      }
    getUserObservable(): Observable<User | null> {
        return this.userSubject.asObservable();
      }
    setCombinedData(data: any) {
        this.combinedData = data;
      }
    setTransaction(details: any[]) {
        this.transactionDetails = details;
      }
    getTransactionlist(): any[] {
        return this.transactionDetails;
      }
    getCombinedData(): any {
        return this.combinedData;
      }
    UserCheckout():Observable<any>{
        if (!this.combinedData || !this.combinedData.dataSource || this.combinedData.dataSource.length === 0) {
            return throwError('No data to checkout.');
          }
      
          const requests = [];
      
          for (const item of this.combinedData.dataSource) {
            const checkoutDetails = {
              userid: this.combinedData.user.id,
              item: item.name,
              quantity: item.quantity,
              price: item.price,
              images: item.product,
              paymentMethod: this.combinedData.checkoutForm.paymentMethod,
              address: this.combinedData.checkoutForm.Address
            };
      
            requests.push(this.httpClient.post<any>(`${this.USER_BASE_URL}/Order/Checkout`, checkoutDetails));
          }
          return forkJoin(requests).pipe(
            mergeMap(responses => {
              return responses;
            })
          );
      }
    Myorder(userId: number):Observable<any>{
      return this.httpClient.get<any>(`${this.USER_BASE_URL}/Order/${userId}`);
      }
    CancelOrder(data: any):Observable<any>{
      console.log(data)
      return this.httpClient.post<any>(`${this.USER_BASE_URL}/Order/CancelOrder`,data);
    }
    
  }