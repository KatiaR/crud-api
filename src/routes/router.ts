import { User } from '../models/user';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController';

export const userRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const urlParts = req.url.split('/');
  const userId = urlParts[2];

  if (url === '/users' && method === 'GET') {
    getUsers(res);
  } else if (userId && method === 'GET') {
    getUserById(res, userId);
  } else if (url === '/users' && method === 'POST') {
    createUser(req, res);
  } else if (method === 'PUT') {
    updateUser(req, res, userId);
  } else if (method === 'DELETE') {
    deleteUser(res, userId);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};
