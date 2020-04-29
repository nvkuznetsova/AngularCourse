import { CourseModel } from '../model/Course';

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export const courses: Array<CourseModel> = [
  new CourseModel(1, 'Video Course 1', new Date(2020, 3, 20), 120, description, true),
  new CourseModel(2, 'Super Course', new Date(2020, 5, 1), 150, description, true),
  new CourseModel(3, 'Video Course 3', new Date(2020, 2, 20), 45, description, false),
  new CourseModel(4, 'Video Course 4', new Date(), 88, description, false),
  new CourseModel(5, 'Cool Course', new Date(2020, 3, 1), 135, description, true),
];

export const course: CourseModel = new CourseModel(1, 'Video Course 1', new Date(), 3600, description, false);
