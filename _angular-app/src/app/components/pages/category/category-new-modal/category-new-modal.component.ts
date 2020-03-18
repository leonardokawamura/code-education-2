import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { Category } from 'src/app/model';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {

  category: Category = {
    name: '',
    active: true
  };

  form: FormGroup;

  @ViewChild(ModalComponent, {static: false})
  modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      active: true
    });
  }

  ngOnInit() {

  }

  submit() {
    this.categoryHttp
      .create(this.category)
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
    this.category.name = '';
    this.category.active = true;
  }

}
