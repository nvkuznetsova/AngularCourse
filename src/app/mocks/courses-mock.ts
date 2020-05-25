import { CourseModel } from '../model/Course';

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit`;

export const courses: Array<CourseModel> = [
  new CourseModel(1, 'Video Course 1', new Date(2020, 3, 20), 120, description, true, []),
  new CourseModel(3, 'Video Course 3', new Date(2020, 2, 20), 45, description, false, []),
  new CourseModel(4, 'Video Course 4', new Date(), 88, description, false, []),
  new CourseModel(2, 'Super Course', new Date(2020, 5, 1), 150, description, true, []),
  new CourseModel(5, 'Cool Course', new Date(2020, 3, 1), 135, description, true, []),
];

export const course: CourseModel = new CourseModel(1, 'Video Course 1', new Date(), 3600, description, false, []);
