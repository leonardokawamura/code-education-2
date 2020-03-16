import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: ''
  };

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
        .subscribe(
          user => this.user = user,
          responseError => {
            if(responseError.status == 401) {
              this.modal.hide();
            }
          }
        );
    }    
  }

  submit() {
    this.userHttp
      .update(this._userId, this.user)
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