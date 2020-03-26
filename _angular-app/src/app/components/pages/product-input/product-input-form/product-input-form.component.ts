import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from '../../product-input/product-input-form/product-input-fields-options';
import { ProductIdFieldService } from './product-id-field.service';
import { Select2Component } from 'ng2-select2';

@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

  @Input()
  form: FormGroup; 

  @ViewChild(Select2Component, {read: ElementRef, static: false})
  select2Element: ElementRef

  constructor(private changeRef: ChangeDetectorRef, public productIdField: ProductIdFieldService) { }

  ngOnInit() {
    this.productIdField.make(this.select2Element, this.form.get('product_id'));
  }

  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldOptions(): any {
    return fieldsOptions;
  }

}
