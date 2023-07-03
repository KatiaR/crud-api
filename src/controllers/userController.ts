import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import {
  successfulResponse,
  unsuccessfulResponse,
  validateUserId,
} from '../utils/util';

const userDir = 'src/users.json';

const getUsersFromFile = () => {
  const users = fs.readFileSync(userDir, 'utf-8');
  return JSON.parse(users);
};

const updateUserJson = (updatedUsersData) => {
  try {
    fs.writeFile(userDir, updatedUsersData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
};

export const getUsers = (res) => {
  const users = fs.readFileSync(userDir, 'utf-8');
  successfulResponse(res, JSON.parse(users));
};

export const getUserById = async (res, userId) => {
  validateUserId(res, userId);
  const users = getUsersFromFile();
  const user = await users.find((user) => user.id === userId);
  if (user) {
    successfulResponse(res, user);
  } else {
    unsuccessfulResponse(res, 404, 'Not Found');
  }
};

export const createUser = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const userData = JSON.parse(body);

      if (!userData.name || !userData.age || !userData.hobbies) {
        unsuccessfulResponse(res, 400, 'Missing required fields');
        return;
      }

      const newUser = {
        id: uuidv4(),
        name: userData.name,
        age: userData.age,
        hobbies: userData.hobbies,
      };
      const users = getUsersFromFile();
      const updatedUsersData = JSON.stringify([...users, newUser]);
      updateUserJson(updatedUsersData);
      successfulResponse(res, newUser, 201);
    } catch (error) {
      unsuccessfulResponse(res, 400, 'Invalid request body');
    }
  });
};

export const updateUser = (req, res, userId) => {
  validateUserId(res, userId);
  const users = getUsersFromFile();
};

export const deleteUser = (res, userId) => {
  validateUserId(res, userId);
  const users = getUsersFromFile();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    updateUserJson(JSON.stringify(users));
    successfulResponse(res, { a: 1 }, 204);
  } else {
    unsuccessfulResponse(res, 404, 'User not found');
  }
};
