import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvEditService {

    private _chatGroupListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set chatGroupListComponent(value: ChatGroupLinkInvListComponent) {
        this._chatGroupListComponent = value;
    }

    showModalEdit(chatGroupId: number) {
        this._chatGroupListComponent.chatGroupId = chatGroupId;
        this._chatGroupListComponent.chatGroupEditModal.showModal();
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Grupo atualizado com sucesso');
        this._chatGroupListComponent.getChatGroups();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Houve um erro na atualização, tente novamente');
    }

}