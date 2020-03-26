import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductOutputNewModalComponent } from '../product-output-new-modal/product-output-new-modal.component';
import { ProductOutputInsertService } from './product-output-insert.service';
import { ProductOutput } from 'src/app/model';
import { ProductOutputHttpService } from 'src/app/services/http/product-output-http.service';

@Component({
  selector: 'product-output-list',
  templateUrl: './product-output-list.component.html',
  styleUrls: ['./product-output-list.component.css']
})
export class ProductOutputListComponent implements OnInit {

  outputs: Array<ProductOutput> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 15
  }

  sortColumn = {column: 'created_at', sort: 'desc'};

  searchText: string = '';

  @ViewChild(ProductOutputNewModalComponent, {static: false})
  outputNewModal: ProductOutputNewModalComponent;

  constructor(private outputHttp: ProductOutputHttpService,
              protected outputInsertService: ProductOutputInsertService) { 
    this.outputInsertService.outputListComponent = this;
  }

  ngOnInit() {
    this.getOutputs();
  }

  getOutputs() {
    this.outputHttp.list({
        page: this.pagination.page,
        sort: this.sortColumn.column === '' ? null : this.sortColumn,
        search: this.searchText === '' ? null : this.searchText      
      })
      .subscribe(response => {        
        this.outputs = response.data;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      });
  }

  pageChanged(page: number) {
    this.pagination.page = page;
    this.getOutputs();
  }

  sort() {
    this.getOutputs();
  }

  search(search: string) {
    this.searchText = search;
    this.getOutputs();
  }

}
