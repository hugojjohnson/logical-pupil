const { plusorMinusRandom, randomIntFromInterval, randomItemOf, generateMultiselect } = require("./helperFunctions")

function q65c1e2b9411308294e1bdd27() {
    // Generate variables
    const vector = randomIntFromInterval(0, 2) === 1 ? true : false
    const vectorQuantities = ["30 km south", "100 m/s north-west", "50 km east", "22 km south-east", "85 km north"]
    const scalarQuantities = ["kilogram (mass)", "26 m/s", "joule (energy)", "30 km"]

    // Generate question
    const question = `Which of these is a ${vector ? "vector" : "scalar"} quantity?`

    // Generate correct options
    let correctOptions = []
    if (vector) {
        correctOptions = [randomItemOf(vectorQuantities)]
    } else {
        correctOptions = [randomItemOf(scalarQuantities)]
    }

    // Generate incorrect options
    let incorrectOptions = []
    if (vector) {
        incorrectOptions = scalarQuantities
    } else {
        incorrectOptions = vectorQuantities
    }

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1e943411308294e1bdd97() {
    // Generate variables
    const numLaps = randomIntFromInterval(1, 10)
    const racetrackLength = randomIntFromInterval(1, 10) * 10

    // Generate question
    const question = `A car completed ${numLaps} laps of a ${racetrackLength} mile racetrack. Which of these is correct?`

    // Generate correct options
    let correctOptions = [`Displacement = 0 miles`, `Distance = ${numLaps * racetrackLength} miles`]

    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push("Distance = 0 miles")
    incorrectOptions.push(`Displacement = ${numLaps * racetrackLength} miles`)

    incorrectOptions.push(`Distance = ${racetrackLength} miles`)
    incorrectOptions.push(`Displacement = ${racetrackLength} miles`)
    incorrectOptions.push("Displacement = 100 miles")

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 
    
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1e451411308294e1bdd48() {
    // Generate variables
    const degree = randomItemOf([30, 60, 90])
    const velocity = randomIntFromInterval(100, 700)
    const xDir = randomIntFromInterval(0, 2) === 1 ? true : false
    const unit = randomItemOf(["m/s", "km/hr"])

    // Generate question
    const question = `A spaceship travels at an angle of ${degree} degrees to the positive x axis at ${velocity} ${unit}. What is its velocity in the ${xDir ? "x" : "y"}-direction?`

    // Generate correct options
    let correctOptions = []
    if (xDir) {
        correctOptions.push(parseInt(velocity * Math.cos(degree * Math.PI / 180)))
    } else {
        correctOptions.push(parseInt(velocity * Math.sin(degree * Math.PI / 180)))
    }
    for (let i = 0; i < correctOptions.length; i++) {
        correctOptions[i] = correctOptions[i] + " " + unit
    }

    // Generate incorrect options
    let incorrectOptions = []
    for (let i = 0; i < 3; i++) {
        if (xDir) {
            incorrectOptions.push(parseInt(velocity * Math.cos(degree * Math.PI / 180) + plusorMinusRandom(2, 10)))
        } else {
            incorrectOptions.push(parseInt(velocity * Math.sin(degree * Math.PI / 180) + plusorMinusRandom(2, 10)))
        }
    }
    for (let i = 0; i < incorrectOptions.length; i++) {
        incorrectOptions[i] = incorrectOptions[i] + " " + unit
    }

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}


function q65c1e86c411308294e1bdd79() {
    function newNumber() {
        const theNum = randomIntFromInterval(20, 1000)
        return theNum + " " + randomItemOf(units)
    }

    // Generate variables
    const displacement = randomIntFromInterval(0, 2) === 1 ? true : false
    const cardinals = ["north", "south", "east", "west", "north-east", "north-west", "south-east", "south-west", "up", "down", "left", "right"]
    const units = ["km", "meters", "miles", "yards", "light years"]

    // Generate question
    const question = `Which of these is an example of ${displacement ? "displacement" : "distance"}?`

    // Generate correct options
    let correctOptions = []
    if (displacement) {
        correctOptions.push(newNumber() + " " + randomItemOf(cardinals))
    } else {
        correctOptions.push(newNumber())
    }

    // Generate incorrect options
    let incorrectOptions = []
    for (let i = 0; i < 3; i++) {
        if (displacement) {
            incorrectOptions.push(newNumber())
        } else {
            incorrectOptions.push(newNumber() + " " + randomItemOf(cardinals))
        }
    }

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

// TODO: This definitely still needs work
function q65c1e8d8411308294e1bdd88() {
    // Generate variables
    const directions = ["north", "south", "east", "west"]
    const xVal = randomIntFromInterval(2, 30)
    const yVal = randomIntFromInterval(2, 30)
    const xDir = randomItemOf(directions)
    const yDir = randomItemOf(directions)
    const theUnit = randomItemOf(["kilometers", "meters", "miles", "yards", "light years"])
    const displacement = randomIntFromInterval(0, 2) === 1 ? true : false

    // Generate question
    const question = `A runner runs ${xVal} ${theUnit} ${xDir} then runs ${yVal} ${theUnit} ${yDir}. What is their ${displacement ? "displacement" : "distance"}?`

    // Generate correct options
    let ans = 0
    if (xDir === yDir) {
        ans = xVal + yVal
        if (displacement && (xDir === "south" || xDir === "west")) {
            ans = - ans
        }
    } else if ((xDir === "north" && yDir === "south") || (xDir === "east" && yDir === "west")) {
        if (displacement) {
            ans = xVal - yVal
        } else {
            ans = xVal + yVal
        }
    } else if ((xDir === "south" && yDir === "north") || (xDir === "west" && yDir === "east")) {
        if (displacement) {
            ans = yVal - xVal
        } else {
            ans = xVal + yVal
        }
    } else {
        if (displacement) {
            ans = Math.sqrt(xVal**2 + yVal**2)
        } else {
            ans = xVal + yVal
        }
    }

    let correctOptions = []
    correctOptions.push(ans + " " + theUnit)

    // Generate incorrect options
    let incorrectOptions = []
    for (let i = 0; i < 3; i++) {
        incorrectOptions.push((ans + plusorMinusRandom(2, 100)) + " " + theUnit)
    }
    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}


function q65c2160f411308294e1be0e8() {
    const question = "What are the units for the Newton?"
    let correctOptions = ["$kg \\times m s^{-2}$"]
    let incorrectOptions = ["$kg \\times m s^{-1}$", "$kg \\times m s$", "$kg^2 \\times m s^{-2}$"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c2cbbbe47b4ef204fc9072() {
    const question = "A 100 gram apple accelerates at $9.8 m s^{-2}$. What would the acceleration of a 1 kg block of wood be?"
    let correctOptions = ["$9.8 m s^{-2}$"]
    let incorrectOptions = ["$98 m s^{-2}$", "$0.98 m s^{-2}$", "$980 m s^{-2}$"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c2cbf0e47b4ef204fc9081() {
    const question = "Acceleration due to gravity depends on"
    let correctOptions = ["The mass of the planet", "The distance from the planet"]
    let incorrectOptions = ["The mass of the object", "The shape of the object"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c2cc7be47b4ef204fc90be() {
    const question = "A 2000 kg rocket takes off from space and accelerates at $10 m s^{-2}$. How much force did the rockets supply?"
    let correctOptions = ["20'000 N", "20 kN"]
    let incorrectOptions = ["200'000 N", "200 kN", "2000 N", "2 kN"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c2cd18e47b4ef204fc90ff() {
    const question = "What is Newton's first law of motion?"
    let correctOptions = ["Objects at rest stay at rest unless acted on by an external force."]
    let incorrectOptions = ["F = ma", "For every action there is an equal and opposite reaction.", "He who eats an apple per day may stay out of contact with the doctor."]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c2cd57e47b4ef204fc910e() {
    const question = "A rocketship moves through space at 200 m/s. Its velocity after 10 seconds will be"
    let correctOptions = ["200 m/s"]
    let incorrectOptions = ["100 m/s", "190 m/s", "0 m/s"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c2ce3fe47b4ef204fc912f() {
    const question = "An object in equilibrium"
    let correctOptions = ["Has constant velocity", "Has zero acceleration", "Has entirely balanced forces"]
    let incorrectOptions = ["Has constant acceleration", "Always has zero velocity"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}



function q660fd026e3f8cf2bc703105b() {
    // Generate variables
    const power = randomIntFromInterval(10, 50) * 100
    let minutes = randomIntFromInterval(2, 60)
    if (randomIntFromInterval(0, 3) === 0) {
        minutes = 60
    }
    // Generate question
    const question = `A kettle has a power rating of ${power} W. How much energy will it use in ${minutes === 60 ? "one hour" : `${minutes} minutes`}?`

    // Generate correct options
    let correctOptions = []
    correctOptions.push(`${power * minutes * 60} J`)

    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push(`${power * minutes} J`)
    incorrectOptions.push(`${power * minutes * 60 / 2} J`)
    incorrectOptions.push(`${power * (minutes -1) * 60} J`)

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q660fd41b0041ce4271243816() {
    // Generate variables
    const F = randomIntFromInterval(1, 100)
    const s = randomIntFromInterval(10, 200)
    let theta = randomIntFromInterval(1, 10) * 5
    if (randomIntFromInterval(0, 2) === 0) {
        theta = 0
    }

    // Generate question
    const question = `A car is pushed ${s} m by a force of ${F} N. The angle between the force and the direction of movement is ${theta}°. What is the work done on the car?`
    // Generate correct options
    let correctOptions = []
    let W = F * s * Math.cos(theta * Math.PI / 180)
    correctOptions.push(`${W.toPrecision(3)} J`)
    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push(`${(F * s * Math.cos(theta)).toPrecision(3)} J`)
    incorrectOptions.push(`${(F * s * Math.cos(theta * Math.PI / 180) + randomIntFromInterval(10, 20) - 10).toPrecision(3)} J`)
    incorrectOptions.push(`${(F * s * Math.sin(theta * Math.PI / 180) + 1).toPrecision(3)} J`)
    
    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q660fd84d986c5bb1a5111c6b() {
    // Generate variables
    const m = randomIntFromInterval(60, 110)
    const A = randomIntFromInterval(1, 60) / 10

    // Generate question
    const question = `A person weighing ${m} kg stands on an area of ${A} m^2. What is the pressure exerted by this person on the floor?`

    // Generate correct options
    let correctOptions = []
    let theAns = (m * 9.81 / A).formatNicely(3)
    correctOptions.push(`${theAns}Pa`)
    // Generate incorrect options
    let incorrectOptions = []
    theAns = (m / A).formatNicely()
    incorrectOptions.push(`${theAns}Pa`)
    theAns = (m * 100).formatNicely()
    incorrectOptions.push(`${theAns}Pa`)
    theAns = (m * 9.81 * A).formatNicely()
    incorrectOptions.push(`${theAns}Pa`)
    theAns = (m * 9.81 * A + randomIntFromInterval(5, 50)).formatNicely()
    incorrectOptions.push(`${theAns}Pa`)

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}


module.exports = { q65c1e2b9411308294e1bdd27, q65c1e451411308294e1bdd48, q65c1e86c411308294e1bdd79, 
    q65c1e8d8411308294e1bdd88, q65c2160f411308294e1be0e8, q65c2cbbbe47b4ef204fc9072, 
    q65c2cbf0e47b4ef204fc9081, q65c2cc7be47b4ef204fc90be, q65c2cd18e47b4ef204fc90ff, 
    q65c2cd57e47b4ef204fc910e, q65c2ce3fe47b4ef204fc912f, q660fd026e3f8cf2bc703105b,
    q660fd41b0041ce4271243816, q660fd84d986c5bb1a5111c6b, q65c1e943411308294e1bdd97 }