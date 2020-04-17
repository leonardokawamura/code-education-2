import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ChatGroupListComponent } from './chat-group-list.component';

@Injectable({
    providedIn: 'root'
})
export class ChatGroupInsertService {

    private _chatGroupListComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set chatGroupListComponent(value: ChatGroupListComponent) {
        this._chatGroupListComponent = value;
    }

    showModalInsert() {
        this._chatGroupListComponent.chatGroupNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Grupo cadastrado');
        this._chatGroupListComponent.getChatGroups();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
    }

}