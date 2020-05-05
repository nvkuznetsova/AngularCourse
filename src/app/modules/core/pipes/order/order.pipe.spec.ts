import { courses } from 'src/app/mocks/courses-mock';

import { OrderPipe } from './order.pipe';

describe('OrderPipe', () => {
  const pipe = new OrderPipe();
  const inputCourses = courses.slice(0, 3);
  const orderedCourses = [ courses[1], courses[0],  courses[2] ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return ordered courses by title', () => {
    expect(pipe.transform(inputCourses, 'creationDate')).toEqual(orderedCourses);
  });

  it('should return unordered courses if no filed', () => {
    expect(pipe.transform(courses, '')).toEqual(courses);
  });
});
