import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the ProductSearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductSearchProvider {

  options = {
    orderBy: 'latest',
    //orderByField: 'price',
    categories: [],
    search: ''
  }

  onUpdate = new Subject<any>();

  onLeavingProductList = new Subject<any>();

  onOpenSearchBar = new Subject<any>();

  onCloseSearchBar = new Subject<any>();
  
  constructor() {}

}
