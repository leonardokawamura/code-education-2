import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvDeleteService {

    private _chatGroupLinkInvListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set chatGroupLinkInvListComponent(value: ChatGroupLinkInvListComponent) {
        this._chatGroupLinkInvListComponent = value;
    }    

    showModalDelete(groupId: number) {
        this._chatGroupLinkInvListComponent.groupId = groupId;
        this._chatGroupLinkInvListComponent.linkInvDeleteModal.showModal();
    }

    onDeleteSuccess($event: any) {
        this._chatGroupLinkInvListComponent.getLinkInvitations();
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notifyMessage.error('Não foi possível excluir o grupo');
    }

}