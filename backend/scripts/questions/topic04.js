const { plusorMinusRandom, randomIntFromInterval, randomItemOf, generateMultiselect } = require("./helperFunctions")

// Generate variables
// Generate question
// Generate correct options
// Generate incorrect options
// Turn into multiselect

function q65cbfc46cd0eda5997e63142() {
    // Generate variables
    const fromHertz = randomIntFromInterval(0, 2) === 1 ? true : false
    const theNum = randomIntFromInterval(1, 1000) / 100
    // const revoPerSec = randomIntFromInterval(0, 2) === 1 ? true : false

    // Generate question
    const tools = ["pendulum", "park swing", "spring", "wave"]
    const question = `A ${tools[randomIntFromInterval(0, tools.length)]} moves with a ${fromHertz ? "frequency" : "period"} of ${theNum} ${fromHertz ? "revolutions per second" : "seconds"}. What is its ${fromHertz ? "period" : "frequency"}?`

    // Generate correct options
    let correctOptions = []
    correctOptions.push((1/theNum).toPrecision(3) + (fromHertz ? " s" : " Hz"))

    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push(theNum.toPrecision(3) + (fromHertz ? " s" : " Hz"))
    incorrectOptions.push(theNum.toPrecision(3) + (fromHertz ? " Hz" : " s"))
    incorrectOptions.push((1 / theNum).toPrecision(3) + (fromHertz ? " Hz" : " s"))
    randomIntFromInterval(0, 2) ? incorrectOptions.push("0 Hz") : incorrectOptions.push("0 s")

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}


// TODO: This one needs work
function q65cc00cd3f135298586363e4() {
    // Generate variables
    const wavelength = randomIntFromInterval(100, 1000)

    // Generate question
    const question = `Light travels at 300'000'000 m/s. If light has a wavelength of ${wavelength} nm, what is its frequency?`

    // Generate correct options
    let correctOptions = [`${(300000000 / wavelength * 10**9).formatNicely()}Hz`]

    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push(`${(wavelength / 300000000 * 10 ** 9).formatNicely()}Hz`)
    incorrectOptions.push(`${(300000000 / wavelength * 10 ** 6).formatNicely()}Hz`)
    incorrectOptions.push(`${(wavelength / 300000000 * 10 ** 6).formatNicely()}Hz`)

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

module.exports = { q65cbfc46cd0eda5997e63142, q65cc00cd3f135298586363e4 }