import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductListComponent } from './product-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductEditService {

    private _productListComponent: ProductListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalEdit(productId: number) {
        this._productListComponent.productEditModal.showModal(productId);
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Produto atualizado com sucesso');
        this._productListComponent.getProducts();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Houve um erro na atualização, tente novamente');
    }

}