import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from './chat-group-link-inv-fields-options';

@Component({
  selector: 'chat-group-link-inv-form',
  templateUrl: './chat-group-link-inv-form.component.html',
  styleUrls: ['./chat-group-link-inv-form.component.css']
})
export class ChatGroupLinkInvFormComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(): any {
    return fieldsOptions
  }

}
