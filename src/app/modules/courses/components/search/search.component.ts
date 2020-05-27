import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  btnText = 'Search';
  placeholdertext = 'Text to search';
  searchInput = '';

  constructor() { }

  ngOnInit() {}

  onSearch(): void {
    this.search.emit(this.searchInput);
  }

}
