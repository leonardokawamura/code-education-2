import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvInsertService {

    private _linkInvListComponent: ChatGroupLinkInvListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set linkInvListComponent(value: ChatGroupLinkInvListComponent) {
        this._linkInvListComponent = value;
    }

    showModalInsert() {
        this._linkInvListComponent.linkInvNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Convite cadastrado');
        this._linkInvListComponent.getLinkInvitations();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
    }

}