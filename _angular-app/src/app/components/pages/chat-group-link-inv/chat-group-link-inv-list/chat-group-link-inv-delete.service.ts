import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvDeleteService {

    private _linkInvListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set linkInvListComponent(value: ChatGroupLinkInvListComponent) {
        this._linkInvListComponent = value;
    }    

    showModalDelete(linkInvId: number) {
        this._linkInvListComponent.linkInvIdToDelete = linkInvId;
        this._linkInvListComponent.linkInvDeleteModal.showModal();
    }

    onDeleteSuccess($event: any) {
        this._linkInvListComponent.getLinkInvitations();
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notifyMessage.error('Não foi possível excluir o convite');
    }

}