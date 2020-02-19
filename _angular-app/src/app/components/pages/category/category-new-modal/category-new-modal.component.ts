import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

  category = {
    name: ''
  };

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  submit() {
    const token = window.localStorage.getItem('token');
    this.http
      .post('http://dev.code-education.com.br/api/categories', this.category, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .subscribe((category) => {
        console.log(category);
        this.modal.hide();
        //this.getCategories();      
      });
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
