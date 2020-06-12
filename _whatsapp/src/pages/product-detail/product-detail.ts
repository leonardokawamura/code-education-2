import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductHttpProvider } from '../../providers/http/product-http.';
import { Product, ProductPhoto } from '../../app/model';

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
              private productHttp: ProductHttpProvider) {
    this.productId = this.navParams.get('product');            
  }

  ionViewWillLoad() {
    this.productHttp.get(this.productId)
      .subscribe(data => this.productData = data);
  }

}
