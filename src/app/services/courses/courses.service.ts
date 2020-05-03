import { Injectable } from '@angular/core';
import { ICourse } from 'src/app/domain/Course';
import { CourseModel } from 'src/app/model/Course';

const desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private courses: Array<ICourse> = [
    {
      id: 1,
      title: 'Video Course 1',
      creationDate: new Date(2020, 3, 20),
      duration: 120,
      description: desc,
      topRated: true,
    },
    {
      id: 3,
      title: 'Video Course 3',
      creationDate: new Date(2020, 2, 20),
      duration: 45,
      description: desc,
      topRated: false,
    },
    {
      id: 4,
      title: 'Video Course 4',
      creationDate: new Date(),
      duration: 88,
      description: desc,
      topRated: false,
    },
    {
      id: 2,
      title: 'Super Course',
      creationDate: new Date(2020, 5, 1),
      duration: 150,
      description: desc,
      topRated: true,
    },
    {
      id: 5,
      title: 'Cool Course',
      creationDate: new Date(2020, 3, 1),
      duration: 135,
      description: desc,
      topRated: true,
    },
  ];

  constructor() { }

  getCoursesList(): Array<CourseModel> {
    return this.courses.map((course: ICourse): CourseModel => {
        const { id, title, creationDate, duration, description, topRated  } = course;
        return new CourseModel(id, title, creationDate, duration, description, topRated);
      });
  }

  getCourseById(courseId: number): CourseModel {
    const { id, title, creationDate, duration, description, topRated  } = this.courses.find((item: ICourse) => item.id === courseId);
    return new CourseModel(id, title, creationDate, duration, description, topRated);
  }

  createCourse(course: ICourse): void {
    this.courses = [ ...this.courses, course ];
  }

  updateCourse(course: ICourse): void {
    const courseIdx = this.courses.findIndex((item: ICourse) => item.id === course.id);
    this.courses[courseIdx] = course;
  }

  removeCourse(courseId: number): void {
    this.courses = this.courses.filter((item: ICourse) => item.id !== courseId);
  }
}
