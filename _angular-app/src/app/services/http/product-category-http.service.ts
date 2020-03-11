import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory, Product } from 'src/app/model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  private baseApi = 'http://dev.code-education.com.br/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  list(productId: number): Observable<ProductCategory> {
    const token = this.authService.getToken();
    return this.http
      .get<{data: ProductCategory}>
      (this.getBaseUrl(productId), {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .pipe(
        map(response => response.data)
      );
  }

  create(productId: number, categoriesId: Array<number>): Observable<ProductCategory> {
    const token = this.authService.getToken();
    return this.http
      .post<{data: ProductCategory}>
      (this.getBaseUrl(productId), {categories: categoriesId}, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .pipe(
        map(response => response.data)
      );
  }

  destroy(productId: number, categoryId: number): Observable<any> {
    const token = this.authService.getToken();
    return this.http
      .delete<any>
      (this.getBaseUrl(productId, categoryId), {
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      });
  }

  private getBaseUrl(productId: number, categoryId: number = null): string {
    let baseUrl = `${this.baseApi}/products/${productId}/categories`;
    if (categoryId) {
      baseUrl += `/${categoryId}`;
    }
    return baseUrl;
  }
  
}
