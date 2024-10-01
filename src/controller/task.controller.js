require('dotenv').config();
const taskSchema = require('../models/task.model');
const { JsonResponse } = require('../middlewarre/response')
const httpStatus = require('http-status');
const taskModel = require('../models/task.model');

module.exports = {
    /**
         * it is used to create a task
         * @param {Request} req 
         * @param {Response} res 
         * @returns object
         */
    createTask: async (req, res) => {
        let resData = {};
        resData.data = [];
        resData.status = false;
        try {
            const { title, dueDate, status } = req.body;

            const result = await taskModel.create({ title, dueDate, status, userId: req.user.id });

            resData.status = true;
            resData.statusCode = httpStatus.CREATED;
            resData.message = "task created successfully";
            resData.data = result;

            return JsonResponse(req, res, resData);

        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    },
    /**
     * it is used to update a task
     * @param {Request} req 
     * @param {Response} res 
     * @returns object
     */
    updateTask: async (req, res) => {
        let resData = {};
        resData.data = [];
        resData.status = false;
        try {
            const taskId = req.params.id;
            const taskData = req.body;

            const result = await taskModel.findByIdAndUpdate(taskId, taskData, { new: true });

            resData.status = true;
            resData.statusCode = httpStatus.OK;
            resData.message = "task updated successfully";
            resData.data = result;

            return JsonResponse(req, res, resData);

        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    },
    /**
 * it is used to delete a task
 * @param {Request} req 
 * @param {Response} res 
 * @returns object
 */
    deleteTask: async (req, res) => {
        let resData = {};
        resData.data = [];
        resData.status = false;
        try {
            const taskId = req.params.id;

            const result = await taskModel.findByIdAndDelete(taskId);

            resData.status = true;
            resData.statusCode = httpStatus.OK;
            resData.message = "task deleted successfully";
            resData.data = result;

            return JsonResponse(req, res, resData);

        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    },
    /**
* it is used to get a task
* @param {Request} req 
* @param {Response} res 
* @returns object
*/
    getTask: async (req, res) => {
        let resData = {};
        resData.data = [];
        resData.status = false;
        try {
            const status = req.query.status;

            const filter = { userId: req.user.id }

            if (status) {
                filter.status = status;
            }

            const result = await taskModel.find(filter);

            resData.status = true;
            resData.statusCode = httpStatus.OK;
            resData.message = "task deleted successfully";
            resData.data = result;

            return JsonResponse(req, res, resData);

        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    },

    /**
* it is used to getOverDueTask
* @param {Request} req 
* @param {Response} res 
* @returns object
*/
    getOverDueTask: async (req, res) => {
        let resData = {};
        resData.data = [];
        resData.status = false;
        try {
            const filter = { userId: req.user.id, dueDate: { $lt: new Date() }, status: { $ne: "DONE" } }

            const result = await taskModel.find(filter);

            resData.status = true;
            resData.statusCode = httpStatus.OK;
            resData.message = "Get over due task";
            resData.data = result;

            return JsonResponse(req, res, resData);

        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    }
}