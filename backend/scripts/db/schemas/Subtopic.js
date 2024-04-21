const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    topic: { type: mongoose.SchemaTypes.ObjectId, required: true },
    name: { type: String, required: true },
    skills: [{ type: mongoose.SchemaTypes.ObjectId }]
})

module.exports = mongoose.model("Subtopics", subTopicSchema)