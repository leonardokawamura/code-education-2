import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/model';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  category: Category = {
    name: '',
    active: true
  };

  _categoryId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;  

  constructor(private http: HttpClient, private categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value;
    if (this._categoryId) {
      this.categoryHttp
        .get(this._categoryId)   
        .subscribe((category) => this.category = category);
    }    
  }

  submit() {
    const token = window.localStorage.getItem('token');
    this.http
      .put('http://dev.code-education.com.br/api/categories/' + this._categoryId, this.category, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
      .subscribe((category) => {  
        this.onSuccess.emit(category);      
        this.modal.hide();   
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
