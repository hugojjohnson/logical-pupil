const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    type: { type: String, enum: ["mcq"], default: "mcq" },
    skill: { type: mongoose.SchemaTypes.ObjectId, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correct: { type: Number, required: true }
})

module.exports = mongoose.model("Mcq", questionSchema, "questions")