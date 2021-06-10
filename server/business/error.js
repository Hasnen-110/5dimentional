const ERROR = {
    GENERAL_ERROR: {message: "Internal server error. Please try again.", status: 500},
    BAD_REQUEST: {message: "A bad request was sent.", status: 400},
    INVALID_USER: {message: "Invalid user", status: 405},
    USER_ALREADY_EXIST: {message: "user already exist", status: 405},
    USER_NOT_EXIST: {message: "user does not exist", status: 404},
    INVALID_PASSWORD: {message: "Invalid password", status: 400},
}

class ApplicationError extends Error {

    constructor(errorObj) {
        var {message, status} = errorObj;
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = status;
        this.message = message;
    }

    addErrorObject(obj) {
        obj.status = this.status;
        obj.message = this.message;
        return obj;
    }

    getErrorObject() {
        return {status: this.status, message: this.message};
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

}

export { ERROR };
export default ApplicationError;