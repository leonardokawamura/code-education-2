import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { CategoryListComponent } from './category-list.component';

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService {

    private _categoryListComponent: CategoryListComponent;

    constructor(private notifyMessage: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalEdit(categoryId: number) {
        this._categoryListComponent.categoryId = categoryId;
        this._categoryListComponent.categoryEditModal.showModal();
    }

    onEditSuccess($event: any) {
        this.notifyMessage.success('Categoria atualizada com sucesso');
        this._categoryListComponent.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error('Houve um erro na atualização, tente novamente');
    }

}