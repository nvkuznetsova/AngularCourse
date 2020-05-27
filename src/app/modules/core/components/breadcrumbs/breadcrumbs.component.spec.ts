import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [ BreadcrumbsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to courses page on `goToMainPage`', () => {
    component.goToMainPage();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/courses');
  });
});
