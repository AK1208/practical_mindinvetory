//It is used for common response
module.exports = {
    JsonResponse: (req, res, resData) => {
        let { status, statusCode, message, data } = resData;

        data = !data ? [] : Array.isArray(data) ? data : [data];

        res.status(statusCode).json({ status, statusCode, message, data });
    }
}