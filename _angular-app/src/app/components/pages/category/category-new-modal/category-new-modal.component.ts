import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

  category = {
    name: '',
    active: true
  };

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

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
        this.onSuccess.emit(category);      
        this.modal.hide();
        //this.getCategories();      
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
