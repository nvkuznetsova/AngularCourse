import { CourseModel } from '../model/Course';

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export const courses: Array<CourseModel> = [
  new CourseModel(1, 'Video Course 1', new Date(), 3600, description),
  new CourseModel(2, 'Video Course 2', new Date(), 3600, description),
  new CourseModel(3, 'Video Course 3', new Date(), 3600, description),
  new CourseModel(4, 'Video Course 4', new Date(), 3600, description),
  new CourseModel(5, 'Video Course 5', new Date(), 3600, description),
];

export const course: CourseModel = new CourseModel(1, 'Video Course 1', new Date(), 3600, description);
