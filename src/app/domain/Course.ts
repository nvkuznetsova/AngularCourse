import { IAuthor } from './Author';

export interface ICourse {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
  authors: Array<IAuthor>;
}
