import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

declare let $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  category = {
    name: ''
  };

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCategories();
  }

  submit() {
    const token = window.localStorage.getItem('token');
    this.http
      .post('http://localhost/projects/code-education/public/api/categories', this.category, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .subscribe((category) => {
        console.log(category);
        this.getCategories();
        $('#exampleModal').modal('hide');        
      });
  }

  getCategories() {
    const token = window.localStorage.getItem('token');
    this.http
      .get<{data: Array<any>}>('http://localhost/projects/code-education/public/api/categories', {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .subscribe(response => {
        response.data[0].active = false;
        this.categories = response.data;
      });
  }

  showModal() {
    this.modal.show();
    setTimeout(() => {
      this.modal.hide();
    }, 2000);
  }

  hideModal($event: Event) {
    
  }

}
