import { User } from '../models/user';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController';

export const userRouter = (req, res) => {
  const users: User[] = [];
  const method = req.method;
  const url = req.url;
  const urlParts = req.url.split('/');
  const userId = urlParts[2];

  if (url === '/users' && method === 'GET') {
    getUsers(res, users);
  } else if (userId && method === 'GET') {
    getUserById(req, res, userId);
  } else if (url === '/users' && method === 'POST') {
    createUser(req, res, users);
  } else if (method === 'PUT') {
    updateUser(req, res, users, userId);
  } else if (method === 'DELETE') {
    deleteUser(res, users, userId);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
};
