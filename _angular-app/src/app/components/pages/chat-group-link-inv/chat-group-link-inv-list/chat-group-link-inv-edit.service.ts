import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvEditService {

    private _linkInvListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set linkInvListComponent(value: ChatGroupLinkInvListComponent) {
        this._linkInvListComponent = value;
    }

    showModalEdit(linkInvId: number) {
        this._linkInvListComponent.linkInvIdToEdit = linkInvId;
        this._linkInvListComponent.linkInvEditModal.showModal();
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Convite atualizado com sucesso');
        this._linkInvListComponent.getLinkInvitations();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Houve um erro na atualização, tente novamente');
    }

}