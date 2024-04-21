const Topic = require("./db/schemas/Topic")
const Subtopic = require("./db/schemas/Subtopic")
const Skill = require("./db/schemas/Skill")
const Numerical = require("./db/schemas/questions/Numerical")
const Multiselect = require("./db/schemas/questions/Multiselect")
const User = require("./db/schemas/User")

const controller = require("./questions/controller")
const auth = require("./auth")

async function getTree(req, res, next) {
    // Returns an array of every single question id.
    try {
        let topics = await JSON.parse(await JSON.stringify(await Topic.find({})))
        let subtopics = await JSON.parse(await JSON.stringify(await Subtopic.find({})))
        let skills = await JSON.parse(await JSON.stringify(await Skill.find({})))
        let questions = await JSON.parse(await JSON.stringify(await Numerical.find({})))

        skills = skills.map(aSkill => {
            return {
                ...aSkill,
                questions: questions.filter(aQuestion => aQuestion.skill.toString() === aSkill["_id"])
            }
        })
        subtopics = subtopics.map(aSubtopic => {
            return {
                ...aSubtopic,
                skills: skills.filter(aSkill => {
                    if (aSkill.subtopic === undefined) {
                        console.error("undefined subtopic")
                    }
                    return aSkill.subtopic.toString() === aSubtopic["_id"]
                })
            }
        })
        topics = topics.map(aTopic => {
            return {
                ...aTopic,
                subtopics: subtopics.filter(aSubtopic => {
                    if (aSubtopic.topic === undefined) {
                        console.error("undefined topic")
                    }
                    return aSubtopic.topic.toString() === aTopic["_id"]
                })
            }
        })

        return res.json(topics)

    } catch (err) {
        console.error(err)
        return next(err);
    }
}

async function getQuestion(req, res, next) {
    if (req.body.questionId === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    // A specific function overrides anything found in MongoDB.
    try {
        let myQuestion = controller.populateQuestion(req.body.questionId)
        return res.json(myQuestion)
    } catch (err) { console.error(err) }

    return res.json({type: "next"})
}

async function getQuestionCodify(req, res, next) {
    if (req.body.questionId === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }
    try {
        let myQuestion = await Multiselect.findById(req.body.questionId)
        return res.json(myQuestion)
    } catch (err) {
        return next(err);
    }

}


async function getPastQuestions(req, res, next) {
    // Get pastQuestions list
    try {
        const myUserId = await auth.tokenToUserId(req.body.token)
        const myUser = await User.findById(myUserId)
        return res.json(myUser.pastQuestions)
    } catch (err) {
        console.error(err)
        return next(err)
    }
}
async function updatePastQuestions(req, res, next) {
    // Update pastQuestions list
    if (req.body.pastQuestions === undefined) {
        console.error(req.body)
        let err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        const myUserId = await auth.tokenToUserId(req.body.token)
        let myUser = await User.findById(myUserId)
        myUser.pastQuestions = req.body.pastQuestions
        await myUser.save()
        return res.send("Success!")
    } catch (err) {
        console.error(err)
        return next(err)
    }
}



module.exports = {
    getQuestion, getQuestionCodify, getPastQuestions,
    updatePastQuestions, getTree }