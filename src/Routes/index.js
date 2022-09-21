const express = require("express");
const router = express.Router();

const AuthMiddlewares = require('../Middlewares/auth');

const UserHandlers = require('../Handlers/User');
const AuthHandlers = require('../Handlers/Auth');

router.get('/user/:id', AuthMiddlewares.verifyToken, UserHandlers.getUser);
router.get('/user', UserHandlers.indexUser);
router.post('/user',  UserHandlers.createUser);
router.delete('/user/:id', AuthMiddlewares.verifyToken, UserHandlers.deleteUser);
router.patch('/user/:id', AuthMiddlewares.verifyToken, UserHandlers.updateUser);

router.post('/auth', AuthHandlers.login);
router.get('/validateToken', AuthHandlers.verifyToken);

module.exports = router;