const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    type: { type: String, enum: ["multiselect"], default: "multiselect" },
    skill: { type: mongoose.SchemaTypes.ObjectId, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correct: [{ type: String, required: true }]
})

module.exports = mongoose.model("Multiselect", questionSchema, "questions")