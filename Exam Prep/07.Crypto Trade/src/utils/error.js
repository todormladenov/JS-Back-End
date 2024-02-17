const mongoose = require("mongoose");

exports.getErrorMessage = (error) => {
    if (error instanceof mongoose.MongooseError) {
        return Object.values(error.errors)[0].message
    } else if (error instanceof Error) {
        return message = error.message;
    }
}