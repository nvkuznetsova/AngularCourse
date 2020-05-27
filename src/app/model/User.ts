import { IUser } from '../domain/User';

export class UserModel implements IUser {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
  ) {}

  getLogin(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
