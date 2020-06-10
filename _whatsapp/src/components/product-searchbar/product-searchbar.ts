import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello ProductSearchbarComponent Component');
    this.text = 'Hello World';
  }

}
