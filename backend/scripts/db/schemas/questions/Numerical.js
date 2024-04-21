const mongoose = require("mongoose");

const variableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    values: [Number]
})

const questionSchema = new mongoose.Schema({
    type: { type: String, enum: ["numerical"], default: "numerical" },
    skill: { type: mongoose.SchemaTypes.ObjectId, required: true },
    variables: [{ type: variableSchema }],
    question: { type: String, required: true },
    answer: { type: String, required: true }
})

module.exports = mongoose.model("Numerical", questionSchema, "questions")