import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})
export class UserInsertService {

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalInsert() {
        this._userListComponent.userNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Usuário cadastrado');
        this._userListComponent.getUsers();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
    }

}