const Topic = require("./db/schemas/Topic")
const Subtopic = require("./db/schemas/Subtopic")
const Skill = require("./db/schemas/Skill")

const Mcq = require("./db/schemas/questions/Mcq")
const Multiselect = require("./db/schemas/questions/Multiselect")
const Numerical = require("./db/schemas/questions/Numerical")

// async function makeTopics(req, res, next) {
//     let subtopics = ["The interaction of matter with radiation", "Nuclear physics"]

//     for (let i = 0; i < subtopics.length; i++) {
//         let tempTopic = new Subtopic({
//             number: (i+1),
//             topic: "65bdc7bb531828bafbbd7a1d",
//             name: subtopics[i],
//             skills: []
//         })
//         await tempTopic.save()
//     }
//     return res.send("Success")
// }


async function getTopics(req, res, next) {
    try {
        let topics = await Topic.find({}).sort({ number: 1 })
        return res.json(topics)
    } catch (err) {
        return next(err)
    }
}
async function getSubTopics(req, res, next) {
    try {
        const subtopics = await Subtopic.find()
        return res.json(subtopics)
    } catch (err) {
        return next(err)
    }
}

// ===== Subtopics =====
async function getSkills(req, res, next) {
    if (req.body.subtopicId === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        const skills = await Skill.find({ subtopic: req.body.subtopicId })
        return res.json(skills)
    } catch (err) {
        return next(err)
    }
}

async function addSkill(req, res, next) {

    if (req.body.subtopic === undefined || req.body.type === undefined || req.body.name === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        const newSkill = new Skill({
            subtopic: req.body.subtopic,
            type: req.body.type,
            name: req.body.name,
            easy: [],
            variations: []
        })
        await newSkill.save()

        let theSubtopic = await Subtopic.findById(req.body.subtopic)
        theSubtopic.skills.push(newSkill["_id"])
        await theSubtopic.save()
        return res.send("Success!")
    } catch (err) {
        return next(err)
    }
}

async function getSubtopicInfo(req, res, next) {
    if (req.body.subtopicId === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        const mySubtopic = await Subtopic.findOne({ _id: req.body.subtopicId })
        return res.json(mySubtopic)
    } catch (err) {
        return next(err)
    }
}

// ===== Skills =====
async function getQuestions(req, res, next) {
    if (req.body.skillId === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        // Even though this is Mcq.find(), it actually finds all the questions!!
        const questions1 = await Mcq.find({ skill: req.body.skillId })
        const questions2 = await Numerical.find({ skill: req.body.skillId })
        return res.json(questions2)
    } catch (err) {
        return next(err)
    }
}

async function addQuestion(req, res, next) {

    if (req.body.question === undefined || req.body.easyHard === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        let newQuestion
        if (req.body.question.type === "mcq") {
            newQuestion = new Mcq(req.body.question)
            await newQuestion.save()
        } else if (req.body.question.type === "multiselect") {
            newQuestion = new Multiselect(req.body.question)
            await newQuestion.save()
        } else if (req.body.question.type === "numerical") {
            newQuestion = new Numerical(req.body.question)
            await newQuestion.save()
        }

        let mySkill = await Skill.findOne({ _id: req.body.question.skill })
        if (req.body.easyHard === "easy") {
            mySkill.easy.push(newQuestion["_id"])
        } else {
            mySkill.variations.push(newQuestion["_id"])
        }
        mySkill.save()
        return res.send("Success!")
    } catch (err) {
        return next(err)
    }
}

async function getSkillInfo(req, res, next) {
    if (req.body.skillId === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        const mySkill = await Skill.findOne({ _id: req.body.skillId })
        return res.json(mySkill)
    } catch (err) {
        return next(err)
    }
}


module.exports = { getTopics, getSubTopics, getSkills, addSkill, getSubtopicInfo, getQuestions, addQuestion, getSkillInfo }