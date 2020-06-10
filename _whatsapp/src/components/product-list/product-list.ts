import { Component, OnInit } from '@angular/core';
import { ProductHttpProvider } from '../../providers/http/product-http.';
import { Product } from '../../app/model';
import { InfiniteScroll, Refresher } from 'ionic-angular';
import { ProductSearchProvider } from '../../providers/product-search/product-search';

/**
 * Generated class for the ProductListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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

  constructor(private productHttp: ProductHttpProvider, private productSearch: ProductSearchProvider) {}

  ngOnInit() {
    this.productSearch.onUpdate
      .subscribe(() => {
        this.getProducts()
          .subscribe(products => {
            this.products = products;
          })
      });
    this.getProducts().subscribe(products => this.products = products);
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

}
