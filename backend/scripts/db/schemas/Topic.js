const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    number: { type: Number, required: true},
    hl: { type: Boolean, required: true },
    name: { type: String, required: true },
    subtopics: [{ type: mongoose.SchemaTypes.ObjectId }]
})

module.exports = mongoose.model("Topics", topicSchema)