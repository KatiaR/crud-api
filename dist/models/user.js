"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(id, name, age, hobbies) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }
}
exports.User = User;
