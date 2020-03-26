import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-output-search-form',
  templateUrl: './product-output-search-form.component.html',
  styleUrls: ['./product-output-search-form.component.css']
})
export class ProductOutputSearchFormComponent implements OnInit {

  search: string;

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.onSearch.emit(this.search);
    return false;
  }

}
