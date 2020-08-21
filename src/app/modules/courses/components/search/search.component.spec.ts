import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue('test');
    expect(component.searchInput).toBe('test');
  });

  it('should set onChange function', () => {
    const func = (value) => value;
    component.registerOnChange(func);
    expect(component.onChange).toEqual(func);
  });

  it('should set onTouch function', () => {
    const func = (value) => value;
    component.registerOnTouched(func);
    expect(component.onTouch).toEqual(func);
  });
});
