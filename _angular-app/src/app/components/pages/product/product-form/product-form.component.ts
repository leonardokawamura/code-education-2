import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from './product-fields-options';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() form: FormGroup;

  @ViewChild('photo', {static: false}) photoInput: ElementRef;

  constructor(private changeRef: ChangeDetectorRef) { }  

  ngOnInit() {
    this.photoInput.nativeElement.value = "";
  }

  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldOptions(): any {
    return fieldsOptions;
  }

  onChoosePhoto(files: FileList) {
    if (!files.length) {
      return;
    }
    this.form.get('photo').setValue(files[0]);
  }

}
