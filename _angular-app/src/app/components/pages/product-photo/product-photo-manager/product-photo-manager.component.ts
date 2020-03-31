import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductPhoto, Product } from 'src/app/model';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductPhotoEditModalComponent } from '../product-photo-edit-modal/product-photo-edit-modal.component';
import { ProductPhotoDeleteModalComponent } from '../product-photo-delete-modal/product-photo-delete-modal.component';

declare const $;

@Component({
  selector: 'product-photo-manager',
  templateUrl: './product-photo-manager.component.html',
  styleUrls: ['./product-photo-manager.component.css']
})
export class ProductPhotoManagerComponent implements OnInit {

  photos: ProductPhoto[];
  product: Product = null;
  productId: number;
  photoIdToEdit: number;
  photoIdToDelete: number;

  @ViewChild(ProductPhotoEditModalComponent, {static: false}) editModal: ProductPhotoEditModalComponent;
  @ViewChild(ProductPhotoDeleteModalComponent, {static: false}) deleteModal: ProductPhotoDeleteModalComponent;

  constructor(private productPhotoHttp: ProductPhotoHttpService,
              private route: ActivatedRoute,
              private notifyMessage: NotifyMessageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getPhotos();
    });
    this.configFancybox();
  }

  getPhotos() {
    this.productPhotoHttp
      .list(this.productId)
      .subscribe(data => {
        this.photos = data.photos;
        this.product = data.product;
      });
  }

  configFancybox() {
    $.fancybox.defaults.btnTpl.edit = `
    <a class="fancybox-button" data-fancybox-edit title="Substituir" href="javascript:void(0)" style="text-align: center">
      <i class="fas fa-edit"></i>
    </a>
    `;

    $.fancybox.defaults.btnTpl.delete = `
    <a class="fancybox-button" data-fancybox-delete title="Excluir foto" href="javascript:void(0)" style="text-align: center">
      <i class="fas fa-trash-alt"></i>
    </a>
    `;

    $.fancybox.defaults.buttons = [ 'download', 'edit', 'delete', 'close' ];
    
    $('body').on('click', '[data-fancybox-edit]', (e) => {
      const photoId = this.getPhotoIdFromSlideShow();
      this.photoIdToEdit = photoId;
      this.editModal.showModal();
    });

    $('body').on('click', '[data-fancybox-delete]', (e) => {
      const photoId = this.getPhotoIdFromSlideShow();
      this.photoIdToDelete = photoId;
      this.deleteModal.showModal();
    });

    $('body').on('click', '.fancybox-button-edit', (e) => {
      const photoId = $(e.currentTarget).attr('id');
      this.photoIdToEdit = photoId.split('-')[1];
      this.editModal.showModal();
    });

    $('body').on('click', '.fancybox-button-delete', (e) => {
      const photoId = $(e.currentTarget).attr('id');
      this.photoIdToDelete = photoId.split('-')[1];
      this.deleteModal.showModal();
    });
  }

  getPhotoIdFromSlideShow() {
    const src = $('.fancybox-slide--current .fancybox-image').attr('src');
    const id = $('[data-fancybox="gallery"]').find(`[src="${src}"]`).attr('id');
    return id.split('-')[1];
  }

  onInsertSuccess(data: {photos: ProductPhoto[]}) {
    this.photos.push(...data.photos);
    this.notifyMessage.success('Foto(s) cadastrada(s) com sucesso');
  }

  onEditSuccess(data: ProductPhoto) {
    if($.fancybox.getInstance() !== false) {
      $.fancybox.getInstance().close();
    }    
    this.editModal.hideModal();
    const index = this.photos.findIndex((photo: ProductPhoto) => {
      return photo.id == this.photoIdToEdit;
    });
    this.photos[index] = data;
    this.notifyMessage.success('Foto substituida com sucesso');
  }

  onDeleteSuccess() {
    if($.fancybox.getInstance() !== false) {
      $.fancybox.getInstance().close();
    }
    this.deleteModal.hideModal();  
    const index = this.photos.findIndex((photo: ProductPhoto) => {
      return photo.id == this.photoIdToDelete;
    });    
    this.photos.splice(index, 1);  
    this.notifyMessage.success('Foto excluída com sucesso');
  }

}
