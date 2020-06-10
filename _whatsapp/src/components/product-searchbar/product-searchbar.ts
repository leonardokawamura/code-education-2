import { Component, Output, EventEmitter } from '@angular/core';
import { ProductSearchProvider } from '../../providers/product-search/product-search';

/**
 * Generated class for the ProductSearchbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-searchbar',
  templateUrl: 'product-searchbar.html'
})
export class ProductSearchbarComponent {

  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(public productSearch: ProductSearchProvider) {}

  back() {
    this.onBack.emit(true);
  }

  filter() {
    this.productSearch.onUpdate.next(true);
  }

}
