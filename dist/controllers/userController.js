"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("../utils/util");
const userDir = 'src/users.json';
const getUsersFromFile = () => {
    const users = fs_1.default.readFileSync(userDir, 'utf-8');
    return JSON.parse(users);
};
const updateUserJson = (updatedUsersData) => {
    try {
        fs_1.default.writeFile(userDir, updatedUsersData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
        });
    }
    catch (error) {
        console.error('Error parsing JSON:', error);
    }
};
const getUsers = (res) => {
    const users = fs_1.default.readFileSync(userDir, 'utf-8');
    (0, util_1.successfulResponse)(res, JSON.parse(users));
};
exports.getUsers = getUsers;
const getUserById = (res, userId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, util_1.validateUserId)(res, userId);
    const users = getUsersFromFile();
    const user = yield users.find((user) => user.id === userId);
    if (user) {
        (0, util_1.successfulResponse)(res, user);
    }
    else {
        (0, util_1.unsuccessfulResponse)(res, 404, 'Not Found');
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const userData = JSON.parse(body);
            if (!userData.name || !userData.age || !userData.hobbies) {
                (0, util_1.unsuccessfulResponse)(res, 400, 'Missing required fields');
                return;
            }
            const newUser = {
                id: (0, uuid_1.v4)(),
                name: userData.name,
                age: userData.age,
                hobbies: userData.hobbies,
            };
            const users = getUsersFromFile();
            const updatedUsersData = JSON.stringify([...users, newUser]);
            updateUserJson(updatedUsersData);
            (0, util_1.successfulResponse)(res, newUser, 201);
        }
        catch (error) {
            (0, util_1.unsuccessfulResponse)(res, 400, 'Invalid request body');
        }
    });
};
exports.createUser = createUser;
const updateUser = (req, res, userId) => {
    (0, util_1.validateUserId)(res, userId);
    const users = getUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const userData = JSON.parse(body);
                const users = getUsersFromFile();
                users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), userData);
                updateUserJson(JSON.stringify(users));
                (0, util_1.successfulResponse)(res, { updated: 'yes' }, 200);
            }
            catch (error) {
                (0, util_1.unsuccessfulResponse)(res, 400, 'Invalid request body');
            }
        });
    }
    else {
        (0, util_1.unsuccessfulResponse)(res, 404, 'User not found');
    }
};
exports.updateUser = updateUser;
const deleteUser = (res, userId) => {
    (0, util_1.validateUserId)(res, userId);
    const users = getUsersFromFile();
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        updateUserJson(JSON.stringify(users));
        (0, util_1.successfulResponse)(res, { deleted: 1 }, 204);
    }
    else {
        (0, util_1.unsuccessfulResponse)(res, 404, 'User not found');
    }
};
exports.deleteUser = deleteUser;
