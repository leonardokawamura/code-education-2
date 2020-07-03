import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { ProductHttpProvider } from '../../providers/http/product-http.';
import { Product, ProductPhoto } from '../../app/model';
import { ProductPhotosPage } from '../product-photos/product-photos';
import { OrderStorePage } from '../order-store/order-store';
import { OrderDetailPage } from '../order-detail/order-detail';
import { OrderListComponent } from '../../components/order-list/order-list';
import { MainPage } from '../main/main';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productId: number;
  productData: {product: Product, photos: ProductPhoto[]};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private productHttp: ProductHttpProvider,
              private modalCtrl: ModalController,
              private app: App) {
    this.productId = this.navParams.get('product');            
  }

  ionViewWillLoad() {
    this.productHttp.get(this.productId)
      .subscribe(data => this.productData = data);
  }

  openPhotos() {
    this.navCtrl.push(ProductPhotosPage, {product_data: this.productData});
  }

  openOrderStore() {
    const modal = this.modalCtrl.create(OrderStorePage, {product: this.productData.product});
    modal.onDidDismiss(result => {
      if (result) {
        //this.navCtrl.push(OrderDetailPage, {order: result});   
        this.app.getRootNavs()[0].push(MainPage, {selectedTabIndex: 2});     
      }
    });
    modal.present();
  }

}
