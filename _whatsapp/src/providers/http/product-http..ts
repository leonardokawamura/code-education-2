import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '@app/env';
import { Product } from '../../app/model';
import { ProductSearchProvider } from '../product-search/product-search';

@Injectable()
export class ProductHttpProvider {

  private baseUrl = `${environment.api.url}/open/products`;

  constructor(private http: HttpClient, private productSearch: ProductSearchProvider) { }

  list(page: number): Observable<{data: Array<Product>, meta: any}> {  
    const fromObject = {
      page,
      'categories[]': this.productSearch.options.categories,
      sort: this.productSearch.options.orderBy == 'latest' ? '-created_at' : 'created_at',
      search: this.productSearch.options.search
    };
    const params = new HttpParams({fromObject: (<any>fromObject)});  
    return this.http
      .get<{data: Array<Product>, meta: any}>(this.baseUrl, {params});
  }

  /*get(id: number): Observable<Product> {
    return this.http
      .get<{data: Product}>(`${this.baseUrl}/${id}`)
        .pipe(
          map(response => response.data)
        );
  }*/

}
