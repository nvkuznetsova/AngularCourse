import { courses } from 'src/app/mocks/courses-mock';

import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  const pipe = new SearchPipe();
  const filteredCourses = courses.slice(0, 3);

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter courses by title', () => {
    const input = 'VIDEO';
    expect(pipe.transform(courses, input, 'title')).toEqual(filteredCourses);
  });

  it('should return all courses if no input', () => {
    expect(pipe.transform(courses, '', 'title')).toEqual(courses);
  });
});
