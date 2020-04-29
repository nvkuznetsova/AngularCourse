import { ICourse } from '../domain/Course';

export class CourseModel implements ICourse {

  constructor(
    public id: number,
    public title: string,
    public creationDate: Date,
    public duration: number,
    public description: string,
    public topRated: boolean,
    ) { }
}
