import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];  

  @ViewChild(CategoryNewModalComponent, {static: false})
  categoryNewModal: CategoryNewModalComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    const token = window.localStorage.getItem('token');
    this.http
      .get<{data: Array<any>}>('http://dev.code-education.com.br/api/categories', {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .subscribe(response => {
        response.data[0].active = false;
        this.categories = response.data;
      });
  }

  showModalInsert() {
    this.categoryNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.getCategories();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
  }

  

}
