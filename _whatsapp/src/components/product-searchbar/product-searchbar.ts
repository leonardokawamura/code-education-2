import { Component, Output, EventEmitter, Renderer2, Input, OnInit, ViewChild } from '@angular/core';
import { ProductSearchProvider } from '../../providers/product-search/product-search';
import { ModalController, Platform, App } from 'ionic-angular';
import { ProductSearchOptionsComponent } from '../product-search-options/product-search-options';
import { SuperTabs } from 'ionic2-super-tabs';
import { CategoryHttpProvider } from '../../providers/http/category-http';
import { ProductHttpProvider } from '../../providers/http/product-http.';
import { ProductDetailPage } from '../../pages/product-detail/product-detail';

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
export class ProductSearchbarComponent implements OnInit {

  public search: string = '';
  public suggestions: Array<any> = [];
  public categories: Array<any> = [];

  @Input('superTabs') superTabs: SuperTabs;
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('searchbar') searchbar;

  constructor(public productSearch: ProductSearchProvider, 
              private modalCtrl: ModalController, 
              private platform: Platform, 
              private app: App,
              private renderer: Renderer2,
              private categoryProvider: CategoryHttpProvider,
              private productProvider: ProductHttpProvider) {
    
  }

  ngOnInit() {
    this.productSearch.onOpenSearchBar.subscribe(() => {
      this.openSearchBar();
    });
    this.productSearch.onLeavingProductList.subscribe(() => {
      this.closeSearchBar();
    });
    this.getCategories();
  }

  back() {
    this.onBack.emit(true);
    this.closeSearchBar();
  }

  filter() {
    this.productSearch.onUpdate.next(true);
  }

  openProductSearchOptions() {
    const modal = this.modalCtrl.create(ProductSearchOptionsComponent);
    modal.present();
  }

  openSearchBar() {    
    let superTabToolBar: HTMLElement = this.superTabs.getElementRef().nativeElement;
    this.renderer.addClass(superTabToolBar.children[0], 'hidden');    
    this.renderer.addClass(superTabToolBar.children[1], 'fixed');  
    this.renderer.addClass(superTabToolBar.children[1].querySelector('#products'), 'fixed');  
    this.setFocusOnSearchBar();
  }

  closeSearchBar() {
    let superTabToolBar: HTMLElement = this.superTabs.getElementRef().nativeElement;
    this.renderer.removeClass(superTabToolBar.children[0], 'hidden');  
    this.renderer.removeClass(superTabToolBar.children[1], 'fixed');  
    this.renderer.removeClass(superTabToolBar.children[1].querySelector('#products'), 'fixed');  
  }

  setFocusOnSearchBar() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 300);
  }

  onSearchPressed(event) {
    this.search = '';
    this.productSearch.options.search = event.target.value;
    this.productSearch.onUpdate.next(true);
  }

  temqueimplementarainda() {
    this.platform.registerBackButtonAction(() => {
      const nav = this.app.getActiveNavs()[0]; 
      const active = nav.getActive();
      console.log(active.component);
      return;
    });
  }

  getCategories() {
    this.categoryProvider.list().subscribe(categories => {
      this.categories = categories
    });
  }

  autocomplete() {
    if (!this.search.trim().length) {
      return;
    }
    if (!this.searchForCategories()) {
      this.searchForProducts();
    }
  }  
    
  searchForCategories() {
    this.suggestions = this.categories
      .filter(category => category.name.toLowerCase().startsWith(this.search.toLowerCase()))
      .map(category => ({ ...category, type: 'category' }))
      console.log(this.suggestions);
    return this.suggestions.length ? true : false;
  }

  searchForProducts() {
    this.productSearch.options.search = this.search;
    this.productProvider.list(1).subscribe(
      response => {
        this.suggestions = response.data.map(product => ({...product, type: 'product'}));
      }
    )
  }

  suggestionSelected(suggestion) {
    switch (suggestion.type) {
      case 'category':
        this.search = '';
        this.productSearch.options.categories.push(suggestion.id);
        this.filter();
        break;
      
      case 'product':
        this.search = '';
        this.app.getRootNavs()[0].push(ProductDetailPage, {product: suggestion.id});
        break;
    
      default:
        this.search = suggestion.text;
        this.setFocusOnSearchBar();
        break;
    }
  }


}
