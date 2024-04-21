// Requires
const path = require("path");
const cors = require('cors');
const express = require('express')
require('dotenv').config()
const mongoose = require("mongoose");

// User requires
const auth = require('./scripts/auth');
const userAPI = require("./scripts/userAPI");
const adminAPI = require("./scripts/adminAPI");
const learnAPI = require("./scripts/learnAPI");
// const wordsAPI = require("./scripts/wordsAPI");

const app = express();
const CURRENT_URL = process.env.CURRENT_URL || "http://localhost:3000"
const uri = `mongodb+srv://hugojohnson271:${process.env.MONGO_DB_PASSWORD}@main.efvjklx.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri).then(console.debug("Connected to MongoDB"));

// ========== Set-up middleware (You can move this into a different file if you want to) ==========
// If you want to send JSON, you need this middleware, which sents the Content-Type header.
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});
// Accept JSON from a post request.
app.use(express.urlencoded({ extended: true })); // turn url parameters (e.g. ?name=alan) into req.body.
app.use(express.json()); // parse incoming data into json.
var allowCrossDomain = function (req, res, next) {
    // Something called CORS; I'm not sure what it is but we need this code here.
    res.header('Access-Control-Allow-Origin', CURRENT_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
}
app.use(allowCrossDomain);
app.use(cors({ credentials: true, origin: CURRENT_URL }));
app.use('/public', express.static('public')) // serve static files




// Members
app.post("/users/sign-up/email", (req, res, next) => {
    return userAPI.signUpWithEmail(req, res, next);
});
app.post("/users/sign-in/email", (req, res, next) => {
    return userAPI.logInWithEmail(req, res, next);
});
app.post("/users/sign-out", auth.verifySession, async (req, res, next) => {
    return await userAPI.signOut(req, res, next);
});
// Google
app.post("/users/sign-up/google", (req, res, next) => {
    return userAPI.signUpWithGoogle(req, res, next);
});
app.post("/users/sign-in/google", (req, res, next) => {
    return userAPI.signInWithGoogle(req, res, next);
});
app.post("/users/sign-out", auth.verifySession, async (req, res, next) => {
    return await userAPI.signOut(req, res, next);
});
app.post("/users/change-pfp", auth.verifySession, async (req, res, next) => {
    return await userAPI.changePfp(req, res, next);
});

app.post("/protected", auth.verifySession, async (req, res, next) => {
    return res.send(await auth.tokenToUserId(req.body.token))
});

// Admin
app.post("/admin/get-topics", auth.isAdmin, async (req, res, next) => {
    return adminAPI.getTopics(req, res, next);
});
app.post("/admin/get-sub-topics", auth.isAdmin, async (req, res, next) => {
    return adminAPI.getSubTopics(req, res, next);
});

app.post("/admin/get-skills", auth.isAdmin, async (req, res, next) => {
    // Gets the skills for a specific subtopic
    return adminAPI.getSkills(req, res, next);
});
app.post("/admin/add-skill", auth.isAdmin, async (req, res, next) => {
    return adminAPI.addSkill(req, res, next);
});
app.post("/admin/get-subtopic-info", auth.isAdmin, async (req, res, next) => {
    return adminAPI.getSubtopicInfo(req, res, next);
});

app.post("/admin/get-questions", auth.isAdmin, async (req, res, next) => {
    // Gets the questions for a specific skill
    return adminAPI.getQuestions(req, res, next);
});
app.post("/admin/add-question", auth.isAdmin, async (req, res, next) => {
    return adminAPI.addQuestion(req, res, next);
});
app.post("/admin/get-skill-info", auth.isAdmin, async (req, res, next) => {
    return adminAPI.getSkillInfo(req, res, next);
});


// ===== Learn =====
app.post("/learn/get-question", auth.verifySession, async (req, res, next) => {
    return learnAPI.getQuestion(req, res, next);
});
app.post("/learn/get-question-codify", auth.verifySession, async (req, res, next) => {
    return learnAPI.getQuestionCodify(req, res, next);
});
app.post("/learn/get-tree", auth.verifySession, async (req, res, next) => {
    return learnAPI.getTree(req, res, next);
});

// pastQuestions functions
app.post("/users/get-past-questions", auth.verifySession, async (req, res, next) => {
    return await learnAPI.getPastQuestions(req, res, next);
});
app.post("/users/set-past-questions", auth.verifySession, async (req, res, next) => {
    return await learnAPI.updatePastQuestions(req, res, next);
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('404: Page not found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    console.error(err)
    console.error(err.message)
    res.status(err.status || 500);
    res.send(err.message);
});

const port = process.env.PORT || 3001;
app.listen(port);
