import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {

  user: User = null;

  _userId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;

  constructor(private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
      this.userHttp
        .get(this._userId)   
        .subscribe((user) => this.user = user);
    }    
  }

  destroy() {
    this.userHttp
      .destroy(this._userId)
      .subscribe((user) => {  
        this.onSuccess.emit(user);      
        this.modal.hide();   
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    
  }

}
