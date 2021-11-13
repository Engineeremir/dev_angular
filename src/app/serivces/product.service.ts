import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://localhost:44321/api/"
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getAllProducts"
    return this.httpClient
      .get<ListResponseModel<Product>>(newPath)

  }

  getProductsByCategory(categoryId:number): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getAllProductsByCategoryId?categoryId="+categoryId
    return this.httpClient
      .get<ListResponseModel<Product>>(newPath)

  }

  add(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"products/addProduct",product)
  }
}
