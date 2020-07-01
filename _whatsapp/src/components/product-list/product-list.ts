import { Component, OnInit } from '@angular/core';
import { ProductHttpProvider } from '../../providers/http/product-http.';
import { Product } from '../../app/model';
import { InfiniteScroll, Refresher, ToastController, Toast, App } from 'ionic-angular';
import { ProductSearchProvider } from '../../providers/product-search/product-search';
import { ProductDetailPage } from '../../pages/product-detail/product-detail';

@Component({
  selector: 'product-list',
  templateUrl: 'product-list.html'
})
export class ProductListComponent implements OnInit {

  products: {data: Product[]} = {
    data: []
  };
  page = 1;
  canMoreProducts = true;
  toastLoading: Toast;

  constructor(private productHttp: ProductHttpProvider, 
              private productSearch: ProductSearchProvider,
              private toastCtrl: ToastController,
              private app: App) {}

  ngOnInit() {
    this.productSearch.onUpdate
      .subscribe(() => {
        this.startLoading();
        this.reset();
        this.getProducts()
          .subscribe(
            products => {
              this.finishLoading();
              this.products = products;
            },
            error => {
              this.finishLoading();
            }
          )
      });
    this.getProducts().subscribe(products => this.products = products);
  }

  startLoading() {
    if(this.toastLoading) {
      this.finishLoading();
    }
    this.toastLoading = this.toastCtrl.create({
      message: 'Carregando...'
    });
    this.toastLoading.present();
  }

  finishLoading() {
    this.toastLoading.dismiss();
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.page++;
    this.getProducts().subscribe(
      products => {
        this.products.data.push(...products.data);
        if(!products.data.length) {
          this.canMoreProducts = false;
        }
        infiniteScroll.complete();
      },
      error => {
        infiniteScroll.complete();
      }  
    );
  }

  doRefresh(refresher: Refresher) {
    this.reset();
    this.getProducts().subscribe(
      products => {
        this.products = products;
        refresher.complete();
      },
      error => {
        refresher.complete();
      }  
    );
  }

  reset() {
    this.page = 1;
    this.canMoreProducts = true;
  }

  getProducts() {
    return this.productHttp.list(this.page);
  }

  openProductDetail(productId: number) {
    //this.app.getRootNav().push(ProductDetailPage, {product: productId});
    this.app.getRootNavs()[0].push(ProductDetailPage, {product: productId});
  }

}
