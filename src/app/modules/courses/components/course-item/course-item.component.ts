import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendarAlt, faClock, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CourseModel } from 'src/app/model/Course';

const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: [ './course-item.component.scss' ],
})
export class CourseItemComponent implements OnInit {
  @Input() course: CourseModel;
  @Output() edit: EventEmitter<CourseModel> = new EventEmitter<CourseModel>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  faPen = faPen;
  faTrash = faTrash;
  faClock = faClock;
  faCalendar = faCalendarAlt;
  duration = '1h 30m';
  btnLabels = {
    edit: 'Edit',
    delete: 'Delete',
  };
  creationDate: string;

  constructor() { }

  ngOnInit() {
    this.creationDate = this.course.creationDate.toLocaleString('en-GB', dateOptions);
  }

  onEdit(): void {
    this.edit.emit(this.course);
  }

  onDelete(): void {
    this.delete.emit(this.course.id);
  }

}
