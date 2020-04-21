import { IUser } from '../domain/User';

export class UserModel implements IUser {
  constructor(
    public id,
    public firstName,
    public lastName,
  ) {}

  getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
