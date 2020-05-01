import { Component } from '@angular/core';

const today = new Date();

@Component({
  template: `
  <div [appHighlightCourse]="greenBorderedDate" data-marker="green-border"></div>
  <div [appHighlightCourse]="blueBorderedDate" data-marker="blue-border"></div>
  <div [appHighlightCourse]="noHighlightedDate" data-marker="no-border"><div>`,
})
export class TestComponent {
  noHighlightedDate = new Date(2020, 2, 20);
  greenBorderedDate = today;
  blueBorderedDate = new Date(new Date().setDate(today.getDate() + 1));
}
