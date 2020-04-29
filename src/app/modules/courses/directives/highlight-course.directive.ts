import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { datesDiff } from 'src/app/utils/dates-diff/dates-diff';

@Directive({
  selector: '[appHighlightCourse]',
})
export class HighlightCourseDirective implements OnInit {
  @Input('appHighlightCourse') creationDate: Date;
  private currentDate = new Date();

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    const diffDates = datesDiff(this.currentDate, this.creationDate);
    if (this.creationDate < this.currentDate && diffDates <= 14) {
      this.renderer.setStyle(this.element.nativeElement, 'border', '1px solid #9bc837');
    }

    if (this.creationDate > this.currentDate) {
      this.renderer.setStyle(this.element.nativeElement, 'border', '1px solid #30b6dd');
    }
  }

}
