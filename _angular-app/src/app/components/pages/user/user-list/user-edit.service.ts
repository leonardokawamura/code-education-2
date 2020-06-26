import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})
export class UserEditService {

    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalEdit(userId: number) {
        this._userListComponent.userEditModal.showModal(userId);
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Usuário atualizado com sucesso');
        this._userListComponent.getUsers();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Houve um erro na atualização, tente novamente');
    }

}