const express = require('express');
const routes = express.Router();


const authController = require('../controller/auth.controller');

routes.post('/register', authController.register);
routes.post('/login', authController.login);

module.exports = routes;