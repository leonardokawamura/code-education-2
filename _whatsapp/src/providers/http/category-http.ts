import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@app/env';
import { Category } from '../../app/model';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryHttpProvider {

  private baseUrl = `${environment.api.url}/open/categories`;

  constructor(private http: HttpClient) { }

  list(): Observable<Array<Category>> {    
    return this.http
      .get<{data: Array<Category>, meta: any}>(this.baseUrl)
      .pipe(
        map(response => response.data)
      );
  }

}
