import { v4 as uuidv4 } from 'uuid';
import {
  isIdValid,
  successfulResponse,
  unsuccessfulResponse,
  validateUserId,
} from '../utils/util';

export const getUsers = (res, users) => {
  successfulResponse(res, users);
};

export const getUserById = (users, res, userId) => {
  validateUserId(res, userId);
  const user = users.find((user) => user.id === userId);
  if (user) {
    successfulResponse(res, users);
  } else {
    unsuccessfulResponse(res, 404, 'Not Found');
  }
};

export const createUser = (req, res, users) => {
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
      users.push(newUser);
      successfulResponse(res, newUser, 201);
    } catch (error) {
      unsuccessfulResponse(res, 400, 'Invalid request body');
    }
  });
};

export const updateUser = (req, res, users, userId) => {
  validateUserId(res, userId);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        const updatedUser = { ...users[userIndex], ...userData };
        users[userIndex] = updatedUser;
        successfulResponse(res, updatedUser);
      } catch (error) {
        unsuccessfulResponse(res, 400, 'Invalid request body');
      }
    });
  } else {
    unsuccessfulResponse(res, 404, 'User not found');
  }
};

export const deleteUser = (res, users, userId) => {
  validateUserId(res, userId);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.writeHead(204);
    res.end();
  } else {
    unsuccessfulResponse(res, 404, 'User not found');
  }
};
