import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoResize]'
})
export class AutoResizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input')
  oninput() {
    this.resize()
  }

  resize() {
    let nativeElement = this.el.nativeElement;
    nativeElement.style.height = 'auto';
    if (nativeElement.scrollHeight  > nativeElement.clientHeight) {
      nativeElement.style.height = nativeElement.scrollHeight + 'px';

    }

  }
}
