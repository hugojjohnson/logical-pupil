const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    pfp: { type: String, required: true, default: "default" },
    google: String,
    password: String,
    pastQuestions: [{
        question: String,
        colour: String,
        lastAttempt: String,
        nextScheduled: String
    }]
})

module.exports = mongoose.model("Users", userSchema)