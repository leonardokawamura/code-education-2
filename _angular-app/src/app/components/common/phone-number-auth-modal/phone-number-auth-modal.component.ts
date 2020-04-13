import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../bootstrap/modal/modal.component';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'phone-number-auth-modal',
  templateUrl: './phone-number-auth-modal.component.html',
  styleUrls: ['./phone-number-auth-modal.component.css']
})
export class PhoneNumberAuthModalComponent implements OnInit {

  unsubscribed;

  @ViewChild(ModalComponent, {static: false}) modal: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(private firebaseAuth: FirebaseAuthService) { }

  ngOnInit() {   
    
  }

  showModal() { 
    this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
    this.firebaseAuth.logout().then(() => {
      this.onAuthStateChanged();
    });
    this.modal.show();
  }

  onAuthStateChanged() {
    this.unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.modal.hide();
        this.onSuccess.emit(user);
      }
    });
  }

  onHideModal() {
    this.unsubscribed();
  }

}
