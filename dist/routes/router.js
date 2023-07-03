"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const userController_1 = require("../controllers/userController");
const userRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const urlParts = req.url.split('/');
    const userId = urlParts[2];
    if (url === '/users' && method === 'GET') {
        (0, userController_1.getUsers)(res);
    }
    else if (userId && method === 'GET') {
        (0, userController_1.getUserById)(res, userId);
    }
    else if (url === '/users' && method === 'POST') {
        (0, userController_1.createUser)(req, res);
    }
    else if (method === 'PUT') {
        (0, userController_1.updateUser)(req, res, userId);
    }
    else if (method === 'DELETE') {
        (0, userController_1.deleteUser)(res, userId);
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};
exports.userRouter = userRouter;
