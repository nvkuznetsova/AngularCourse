import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.scss' ],
})
export class SearchComponent implements OnInit {
  btnText = 'Search';
  placeholdertext = 'Text to search';
  searchInput = '';

  constructor() { }

  ngOnInit() {}

  onSearch(): void {
    console.log(this.searchInput);
  }

}
