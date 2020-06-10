import { Component, OnInit } from '@angular/core';
import { ProductHttpProvider } from '../../providers/http/product-http.';
import { Product } from '../../app/model';

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

  constructor(private productHttp: ProductHttpProvider) {}

  ngOnInit() {
    this.getProducts().subscribe(products => this.products = products);
  }

  getProducts() {
    return this.productHttp.list(this.page);
  }

}
