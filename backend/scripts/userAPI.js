const User = require("./db/schemas/User")
const Session = require("./db/schemas/Session")
const Topic = require("./db/schemas/Topic")
const auth = require("./auth")
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config()


async function signUpWithEmail(req, res, next) {
    // check email is not already in the database
    // if it is, redirect to log in
    // add user to database
    // redirect to login
    if (req.body.email === undefined || req.body.username === undefined || req.body.password === undefined) {
        console.error(req.body)
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        if (await User.exists({ email: req.body.email })) {
            err = new Error("Email already exists. Please log in.")
            err.status = 303
            return next(err)
        }
        if (await User.exists({ username: req.body.username })) {
            err = new Error("That username is already taken. Please try a different one.")
            err.status = 400
            return next(err)
        }

        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        newUser.save()
        return res.send("hi there! success");
        // next(); is not needed here because you've just responded to the request.
        // res.sendFile(path.join(__dirname + '/../views/clientPage.html'));
    } catch (err) {
        return next(err);
    }
}

async function signUpWithGoogle(req, res, next) {
    try {
        // check email is not already in the database
        // if it is, redirect to log in
        // add user to database
        // redirect to login
        if (req.body.google_jwt === undefined) {
            err = new Error("Details not entered correctly. Please try again.")
            err.status = 400;
            return next(err)
        }

        // Verify jwt
        const client_id = process.env.GOOGLE_CLIENT_ID
        const client = new OAuth2Client(client_id);
        // Call verifyIdToken to verify and decode it
        const ticket = await client.verifyIdToken({
            idToken: req.body.google_jwt,
            audience: client_id,
        });
        // Get the JSON with all the user info
        const payload = ticket.getPayload();


        if (await User.exists({ google: payload.sub })) {
            err = new Error("You've already linked this Google account. Please log in.")
            err.status = 303
            return next(err)
        }
        if (await User.exists({ email: payload.email })) {
            // add google and save it
            let user = await User.findOne({ email: payload.email })
            user.google = payload.sub
            await user.save()
            return res.send("Current user updated.")
        }

        const newUser = new User({
            email: payload.email,
            username: payload.given_name,
            google: payload.sub
        })

        await newUser.save()
        return res.send("New user created!");

    } catch (err) {
        return next(err)
    }
}

async function logInWithEmail(req, res, next) {
    if (req.body.email === undefined || req.body.password === undefined) {
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password })
        if (user === null) {
            err = new Error("Email or password incorrect. Please try again.")
            err.status = 401
            return next(err)
        }

        const newSession = new Session({
            user: user,
        })

        await newSession.save()
        return res.send(JSON.stringify({
            token: newSession.id,
            username: user.username,
            pfp: user.pfp
        }));
    } catch (err) {
        return next(err);
    }
}

async function signInWithGoogle(req, res, next) {
    if (req.body.google_jwt === undefined) {
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }
    

    try {
        // Verify jwt
        const client_id = process.env.GOOGLE_CLIENT_ID
        const client = new OAuth2Client(client_id);
        // Call verifyIdToken to verify and decode it
        const ticket = await client.verifyIdToken({
            idToken: req.body.google_jwt,
            audience: client_id,
        });
        // Get the JSON with all the user info
        const payload = ticket.getPayload();

        const user = await User.findOne({ google: payload.sub })
        if (user === null) {
            err = new Error("Email or password incorrect. Please try again.")
            err.status = 401
            return next(err)
        }

        const newSession = new Session({
            user: user
        })

        await newSession.save()
        return res.send(JSON.stringify({
            token: newSession.id,
            username: user.username,
            pfp: user.pfp
        }));
    } catch (err) {
        return next(err);
    }
}

async function signOut(req, res, next) {
    if (req.body.token === undefined) {
        err = new Error("Token not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }

    try {
        let session = await Session.findById(req.body.token)
        session.active = false
        await session.save()

        return res.send("hi there! success");
    } catch (err) {
        return next(err);
    }
}

async function changePfp(req, res, next) {
    if (req.body.new_pfp === undefined) {
        err = new Error("Details not entered correctly. Please try again.")
        err.status = 400;
        return next(err)
    }
    const userId = await auth.tokenToUserId(req.body.token)
    
    // You're gonna have to link this up with the front end... sorry!
    const new_pfp_list = ["default", "astronaut", "cactus", "cameleon", "cow", "demon", "dragon", "lollipop", "polar"]
    if (!new_pfp_list.includes(req.body.new_pfp)) {
        err = new Error("Profile picture not found.")
        return next(err)
    }

    try {
        let userToChange = await User.findById(userId)
        userToChange.pfp = req.body.new_pfp
        await userToChange.save()

        return res.send("Success!");
    } catch (err) {
        return next(err);
    }
}


module.exports = { signUpWithEmail, signUpWithGoogle, logInWithEmail, signInWithGoogle, signOut, changePfp }