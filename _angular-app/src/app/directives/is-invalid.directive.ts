import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[isInvalid]'
})
export class IsInvalidDirective implements OnInit {

  constructor(private element: ElementRef, private control: NgControl) { }

  ngOnInit() {
    toggleClassInvalid(this.control, this.element.nativeElement);
  }

}

@Directive({
  selector: '[isInvalidControl]'
})
export class IsInvalidControlDirective implements OnInit {

  control: NgControl;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    toggleClassInvalid(this.control, this.element.nativeElement);
  }

  @Input()
  set isInvalidControl(value) {
    this.control = value;
  }

}

function toggleClassInvalid(control: NgControl, nativeElement: HTMLElement) {
  control.valueChanges.subscribe(() => {    
    if(control.invalid && (control.dirty || control.touched)) {
      if(!nativeElement.classList.contains('is-invalid')) {
        nativeElement.classList.add('is-invalid');
      }
    } else {
      nativeElement.classList.remove('is-invalid');
    }
  });
}
