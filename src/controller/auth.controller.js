require('dotenv').config();
const userSchema = require('../models/user.model');
const { JsonResponse } = require('../middlewarre/response')
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * it is used to register a user
     * @param {Request} req 
     * @param {Response} res 
     */
    register: async (req, res) => {
        let resData = {};
        resData.data = [];
        resData.status = false;

        try {
            const { name, email, password } = req.body;
            const hashPassword = await bcrypt.hashSync(password, 10);

            const user = await userSchema.create({ name, email, password: hashPassword });

            resData.status = true;
            resData.statusCode = httpStatus.OK;
            resData.message = "User register successfully";
            resData.data = user;

            return JsonResponse(req, res, resData);
        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    },
    /**
     * it is used to login a user
     * @param {Request} req 
     * @param {Response} res 
     */
    login: async (req, res) => {
        let resData = {};
        resData.data = [];
        resData.status = false;

        try {
            const { email, password } = req.body;
            //to check user exist in database
            const user = await userModel.findOne({ email });

            if (!user || !(await bcrypt.compareSync(password, user.password))) {
                resData.statusCode = httpStatus.UNAUTHORIZED;
                resData.message = "Invalid credentials";

                return JsonResponse(req, res, resData);
            }

            const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });

            resData.status = true;
            resData.statusCode = httpStatus.OK;
            resData.message = "User login successfully";
            resData.data = token;

            return JsonResponse(req, res, resData);
        } catch (error) {
            resData.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            resData.message = error.message;

            return JsonResponse(req, res, resData);
        }
    }
}