import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarAlt, faClock, faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CourseModel } from 'src/app/model/Course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: [ './course-item.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent implements OnInit, DoCheck {
  @Input() course: CourseModel;
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<{ courseId: number, title: string }> = new EventEmitter<{ courseId: number, title: string }>();
  faPen = faPen;
  faTrash = faTrash;
  faClock = faClock;
  faStar = faStar;
  faCalendar = faCalendarAlt;
  btnLabels = {
    edit: 'Edit',
    delete: 'Delete',
  };

  constructor() { }

  ngDoCheck(): void {
    console.log('doCheck called');
  }

  ngOnInit() {}

  onEdit(): void {
    this.edit.emit(this.course.id);
  }

  onDelete(): void {
    this.delete.emit({ courseId: this.course.id, title: this.course.title });
  }

}
