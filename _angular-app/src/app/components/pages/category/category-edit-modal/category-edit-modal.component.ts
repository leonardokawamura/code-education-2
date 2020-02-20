import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  category = {
    name: ''
  };

  _categoryId: number;

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    console.log(value);
    const token = window.localStorage.getItem('token');
    this._categoryId = value;
    this.http.get<{data: any}>('http://dev.code-education.com.br/api/categories/' + value, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .subscribe((response) => this.category = response.data);
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
