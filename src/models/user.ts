import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(
    public id: string,
    public username: string,
    public age: number,
    public hobbies: string[]
  ) {
    this.id = uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}
