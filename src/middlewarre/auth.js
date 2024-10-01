require('dotenv').config();
const { JsonResponse } = require('./response');
const userSchema = require('../models/user.model');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');


module.exports = {

    auth: async (req, res, next) => {
        let resData = {};
        resData.data = [];
        resData.status = false;
        try {
            const token = req.headers.authorization;

            if (!token) {
                resData.statusCode = httpStatus.NOT_FOUND;
                resData.message = "Token not found in headers";

                return JsonResponse(req, res, resData);
            }
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    }
}