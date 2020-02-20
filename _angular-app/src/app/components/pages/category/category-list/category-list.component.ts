import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];  

  categoryId: number;

  @ViewChild(CategoryNewModalComponent, {static: false})
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent, {static: false})
  categoryEditModal: CategoryEditModalComponent;

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

  showModalEdit(categoryId: number) {
    this.categoryId = categoryId;
    this.categoryEditModal.showModal();
  }

  onInsertSuccess($event: any) {
    this.getCategories();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
  }

  

}
