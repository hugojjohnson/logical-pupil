const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    subtopic: { type: mongoose.SchemaTypes.ObjectId, required: true },
    type: { type: String, enum: ["unit", "formula", "word problem", "understanding", "graph"], required: true },
    name: { type: String, required: true },
    easy: [{ type: mongoose.SchemaTypes.ObjectId }]
})

module.exports = mongoose.model("Skills", skillSchema)