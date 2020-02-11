import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    this.http.get<Array<any>>('http://localhost/projects/code-education/public/api/categories', {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .subscribe(data => this.categories = data);
  }

}
