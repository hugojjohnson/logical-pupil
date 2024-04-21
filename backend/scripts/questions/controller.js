// {
//     type: "multiselect",
//     options: ["one", "two", "three"],
//     correct: [1, 2],
//     difficulty: "easy"
// }

const topicOne = require("./topic01")
const topicTwo = require("./topic02")
const topicThree = require("./topic03")
const topicFour = require("./topic04")
const topicEleven = require("./topic11")

function populateQuestion(id) {
    try {
        return topicOne["q" + id]()
    } catch (err) {
        // console.error(err)
    }

    try {
        return topicTwo["q" + id]()
    } catch (err) {
        // console.error(err)
    }

    try {
        return topicThree["q" + id]()
    } catch (err) {
        // console.error(err)
    }

    try {
        return topicFour["q" + id]()
    } catch (err) {
        // console.error(err)
    }

    try {
        return topicEleven["q" + id]()
    } catch (err) {
        // console.error(err)
    }

    throw new Error("Question ID not found.")
}

module.exports = { populateQuestion }

