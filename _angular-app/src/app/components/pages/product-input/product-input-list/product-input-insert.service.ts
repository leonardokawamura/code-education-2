import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductInputListComponent } from './product-input-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductInputInsertService {

    private _inputListComponent: ProductInputListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set inputListComponent(value: ProductInputListComponent) {
        this._inputListComponent = value;
    }

    showModalInsert() {
        this._inputListComponent.inputNewModal.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Entrada de estoque cadastrado');
        this._inputListComponent.getInputs();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log($event);
    }

}