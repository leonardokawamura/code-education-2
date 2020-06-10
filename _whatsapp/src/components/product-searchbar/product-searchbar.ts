import { Component, Output, EventEmitter } from '@angular/core';

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

  constructor() {}

  back() {
    this.onBack.emit(true);
  }

}
