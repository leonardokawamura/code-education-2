import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '@app/env';
import { Product } from '../../app/model';

@Injectable()
export class ProductHttpProvider {

  private baseUrl = `${environment.api.url}/open/products`;

  constructor(private http: HttpClient) { }

  list(page: number): Observable<{data: Array<Product>, meta: any}> {    
    return this.http
      .get<{data: Array<Product>, meta: any}>(this.baseUrl);
  }

  /*get(id: number): Observable<Product> {
    return this.http
      .get<{data: Product}>(`${this.baseUrl}/${id}`)
        .pipe(
          map(response => response.data)
        );
  }*/

}
