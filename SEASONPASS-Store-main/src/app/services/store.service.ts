import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Subject } from 'rxjs';

const STORE_BASE_URL = 'http://localhost:3006/api/ecommerce/Product';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private logindetail = new Subject<any>();
  public data$ = this.logindetail.asObservable();

  constructor(private httpClient: HttpClient) {}

  sendData(data: any) {
    this.logindetail.next(data);
  }

  getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Array<Product>> {
    
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/list${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/categories`
    );
  }

}
