import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() breadcrumbLabel: string;
  breadcrumbs = 'Course';

  constructor(private router: Router) {  }

  goToMainPage(): void {
    this.router.navigateByUrl('/courses');
  }

}
