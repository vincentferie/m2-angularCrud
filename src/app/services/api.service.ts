import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /* POST request to add a new product to the database */
  postProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/productList', data);
  }

  /* GET request to get all products from the database */
  getProduct() {
    return this.http.get<any>('http://localhost:3000/productList');
  }

  /* PUT request to updatZ a single product from the database */
  putProduct(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/productList/' + id, data);
  }

  /* DELETE request to delete a single product from the database */
  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:3000/productList/' + id);
  }
}
