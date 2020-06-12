import { Component } from '@angular/core';

/**
 * Generated class for the ProductSearchOptionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-search-options',
  templateUrl: 'product-search-options.html'
})
export class ProductSearchOptionsComponent {

  text: string;

  constructor() {
    console.log('Hello ProductSearchOptionsComponent Component');
    this.text = 'Hello World';
  }

}
