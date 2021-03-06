import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'order-search-form',
  templateUrl: './order-search-form.component.html',
  styleUrls: ['./order-search-form.component.css']
})
export class OrderSearchFormComponent implements OnInit {

  search = '';
  
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.onSearch.emit(this.search);
    return false;
  }

}
