import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Order } from '../../../../model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  @Input() order: Order;
  @Input() form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) {}

  ngOnInit() {}

  // usado para ativar mudanças no componente, repassando as mudanças do formulario,
  // para o form builder do elemento pai.
  ngOnChanges() {
    this.changeRef.detectChanges();
  }

}
