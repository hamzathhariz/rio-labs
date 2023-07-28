const response = require('../config/response');

module.exports = (status = 'success', message = "", data = {}, status_code = 0) => {

    if (status === 'success') {
        response.success.message = message ? message : "Operation Succesful";

        response.success.statusCode = status_code ? status_code : 200;

        response.success.data = data;

        return response.success;
    }
    response.error.message = message ? message : "Operation Failed";

    response.error.statusCode = status_code ? status_code : 400;

    response.error.data = data;

    return response.error;
}
