const express = require('express');
const routes = express.Router();

const authRoute = require('./routes/auth.route');
const taskRoute = require('./routes/task.route');

routes.use('/user', authRoute);
routes.use('/task', taskRoute);

module.exports = routes;