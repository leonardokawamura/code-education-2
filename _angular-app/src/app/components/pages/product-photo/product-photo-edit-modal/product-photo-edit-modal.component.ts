import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

@Component({
  selector: 'product-photo-edit-modal',
  templateUrl: './product-photo-edit-modal.component.html',
  styleUrls: ['./product-photo-edit-modal.component.css']
})
export class ProductPhotoEditModalComponent implements OnInit {

  errors = {};
  productId: number;

  @ViewChild(ModalComponent, {static: false}) modal:ModalComponent;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
    });
  }

  editPhoto(files: FileList) {
    if(!files.length) {
      return false;
    }
    this.productPhotoHttp
      .create(this.productId, files)
      .subscribe(data => this.onSuccess.emit(data),
        responseError => {
          if(responseError.status == 422) {
            this.errors = responseError.error.errors;
          }
          this.onError.emit(responseError);
        }
      );
  }

  showModal() {
    this.modal.show();
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

}
