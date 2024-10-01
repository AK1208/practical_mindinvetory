const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true, "Please enter userId"]
    },
    title: {
        type: String,
        required: [true, "Please enter title"]
    },
    dueDate: {
        type: Date,
        required: [true, "Please enter dueDate"]
    },
    status: {
        type: String,
        enum: ['TODO', "Backlog", "In-Progress", "DONE"],
        default: 'TODO',
        required: [true, "Please enter status"],
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("task", task, "task")