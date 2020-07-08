import { Component, Output, EventEmitter, Renderer2, Input, OnInit } from '@angular/core';
import { ProductSearchProvider } from '../../providers/product-search/product-search';
import { ModalController, Platform, App } from 'ionic-angular';
import { ProductSearchOptionsComponent } from '../product-search-options/product-search-options';
import { SuperTabs } from 'ionic2-super-tabs';

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

  @Input('superTabs') superTabs: SuperTabs;
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(public productSearch: ProductSearchProvider, 
              private modalCtrl: ModalController, 
              private platform: Platform, 
              private app: App,
              private renderer: Renderer2) {
    this.platform.registerBackButtonAction(() => {
      const nav = this.app.getActiveNavs()[0]; 
      const active = nav.getActive();
      console.log(active.component);
      return;
    });
  }

  ngOnInit() {
    this.productSearch.onOpenSearchBar.subscribe(() => {
      this.openSearchBar();
    });
    this.productSearch.onLeavingProductList.subscribe(() => {
      this.closeSearchBar();
    });
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
  }

  closeSearchBar() {
    let superTabToolBar: HTMLElement = this.superTabs.getElementRef().nativeElement;
    this.renderer.removeClass(superTabToolBar.children[0], 'hidden');  
    this.renderer.removeClass(superTabToolBar.children[1], 'fixed');  
    this.renderer.removeClass(superTabToolBar.children[1].querySelector('#products'), 'fixed');  
  }

}
