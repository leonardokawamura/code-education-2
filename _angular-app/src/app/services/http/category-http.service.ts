import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {

  constructor(private http: HttpClient) { }

  list() {
    const token = window.localStorage.getItem('token');
    return this.http
      .get<{data: Array<any>}>('http://dev.code-education.com.br/api/categories', {
        headers: {
          'Authorization' : 'Bearer ' + token
        }
      });
  }

  get() {

  }

  create() {

  }


}
