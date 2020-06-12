import { Component, OnInit } from '@angular/core';
import { ProductSearchProvider } from '../../providers/product-search/product-search';
import { CategoryHttpProvider } from '../../providers/http/category-http';
import { Category } from '../../app/model';

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
export class ProductSearchOptionsComponent implements OnInit{
 
  categories: Category[] = [];

  constructor(public productSearch: ProductSearchProvider, private categoryHttp: CategoryHttpProvider) {
    
  }

  ngOnInit() {
    this.categoryHttp.list().subscribe(categories => {
      this.categories = categories;
    });
  }

}
