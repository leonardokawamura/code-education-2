import { Directive, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';

/**
 * Generated class for the DomMutationDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[domMutation]' // Attribute selector
})
export class DomMutationDirective implements OnDestroy {

  private changes: MutationObserver;

  @Output()
  public domMutation = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
          mutations.forEach((mutation: MutationRecord) => this.domMutation.emit(mutation));
        }
    );

    this.changes.observe(element, {
      attributes: true,
      // childList: true,
      // characterData: true,
      // subtree: true
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
