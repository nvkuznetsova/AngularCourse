import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { IAuthor } from 'src/app/domain/Author';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: [ './authors.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent implements OnInit {
  @Input() control: AbstractControl;
  @ViewChild('authorsInput', { static: true } ) input: ElementRef<HTMLInputElement>;

  filteredAuthors$: Observable<Array<IAuthor>>;
  allAuthors: Array<IAuthor>;
  separators = [ ENTER, COMMA ];
  faClose = faTimes;
  authorsGroup = new FormGroup({
    authorsControl: new FormControl(),
  });

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.filteredAuthors$ = this.coursesService.getAuthors().pipe(
      tap((authors) => this.allAuthors = authors),
      switchMap(() => this.authorsControl.valueChanges.pipe(
        startWith(''),
        map((input) => this.filterAuthors(input)),
      )),
    );
  }

  get authorsControl(): AbstractControl {
    return this.authorsGroup.get('authorsControl');
  }

  removeAuthor(id: string | number): void {
    const index = this.control.value.findIndex(author => author.id === id);

    if (index >= 0) {
      this.control.value.splice(index, 1);
    }
  }

  selectAuthor(event: MatAutocompleteSelectedEvent): void {
    const author = this.allAuthors.find(courseAuthor => courseAuthor.id === event.option.value);
    const currentAuthors = [ ...this.control.value, author ];
    this.control.setValue(currentAuthors);
    this.input.nativeElement.value = '';
  }

  private filterAuthors(input: string): Array<IAuthor> {
    const filterValue = input.toLowerCase();
    return this.allAuthors.filter(author => author.name.toLowerCase().includes(filterValue));
  }
}
