import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(
    public id: string,
    public name: string,
    public age: number,
    public hobbies: string[]
  ) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}
