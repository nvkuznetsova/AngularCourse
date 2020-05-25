import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent implements ControlValueAccessor {
  // @Output() search: EventEmitter<string> = new EventEmitter<string>();
  btnText = 'Search';
  placeholdertext = 'Text to search';
  searchInput = '';
  onChange: (value: any) => void;
  onTouch: () => void;

  constructor() { }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.searchInput = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // onSearch(): void {
  //   this.search.emit(this.searchInput);
  // }

}
