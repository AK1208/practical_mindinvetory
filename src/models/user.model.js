const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("user", user, "user")