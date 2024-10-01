const express = require('express');
const routes = express.Router();
const { auth } = require('../middlewarre/auth')


const taskController = require('../controller/task.controller');

routes.post('/createTask', auth, taskController.createTask);
routes.put('/updateTask/:id', auth, taskController.updateTask);
routes.delete('/deleteTask/:id', auth, taskController.deleteTask);
routes.get('/getTask', auth, taskController.getTask);
routes.get('/getOverDueTask', auth, taskController.getOverDueTask);

module.exports = routes;