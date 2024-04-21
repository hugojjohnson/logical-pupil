require('dotenv').config()

const mongoose = require("mongoose")

const Skill = require("./schemas/Skill")



async function doStuff() {
    const uri = `mongodb+srv://hugojohnson271:${process.env.MONGO_DB_PASSWORD}@main.efvjklx.mongodb.net/?retryWrites=true&w=majority`
    await mongoose.connect(uri)
    console.debug("Connected to MongoDB")

    // const skills = await Skill.find({})
    // for (let skill of skills) {
    //     skill.variations = undefined
    //     await skill.save()
    // }
    // await User.updateMany({}, { pastQuestions: [] });
    // Skill.updateMany({}, { $unset: { variations: 1 } })
}

doStuff()