import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  
  
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }
  //need to build URL based on the category id
  

  getProductList(theCategoryId:number): Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }
  getProductCategories(): Observable<ProductCategory[]> { 
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  seachPrdoucts(theKeyword: string): Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductListPaginate(thePage:number, pageSize:number,
    theCategoryId:number): Observable<GetResponseProducts>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

}

interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number, 
    totalPage: number,
    number: number
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
