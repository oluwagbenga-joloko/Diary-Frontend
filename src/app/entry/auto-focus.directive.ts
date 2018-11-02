import { Directive, ElementRef, HostListener , AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective  implements AfterViewInit {

  constructor(private el: ElementRef) { }

  focus() {
    this.el.nativeElement.focus()
  }

  ngAfterViewInit() {
    this.focus()
  }

}
