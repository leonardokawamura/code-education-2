import { Injectable, ElementRef } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import { AuthService } from 'src/app/services/auth.service';

declare const $;

@Injectable({
  providedIn: 'root'
})
export class ProductIdFieldService {

  data;
  options: Select2Options;
  select2Element: ElementRef;

  constructor(private authSerivce: AuthService) { }

  get divModal() {
    const modalElement = this.select2Native.closest('modal');
    return modalElement.firstChild;
  }

  get select2Native() {
    return this.select2Element.nativeElement;
  }

  make(select2Element: ElementRef) {
    this.select2Element = select2Element;
    this.options = {
      dropdownParent: $(this.divModal)
    };
    this.data = [
      {id: 1, text: 'laravel'},
      {id: 1, text: 'angular'}
    ]
  }
  
}
