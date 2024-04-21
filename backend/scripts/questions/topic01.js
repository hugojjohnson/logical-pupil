const { plusorMinusRandom, randomIntFromInterval, randomItemOf, generateMultiselect } = require("./helperFunctions")
function q65c1ca1de4eb1e8fa990f718() {
    const question = "Which of these is a standard unit?"
    let correctOptions = ["metre", "kilogram", "Ampere", "Kelvin"]
    let incorrectOptions = ["kilometer", "gram", "minute", "Newton", "Joule", "Watt", "Celsius", "Hertz", "Pascale", "Mile", "Foot", "Inch"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1cb9fe4eb1e8fa990f731() {
    const question = "The formula for speed is $ \\frac{distance}{time}$. What are the SI units for speed?"
    let correctOptions = ["m/s", "$ms^{-1}$", "$\\frac{m}{s}$", "meters per second"]
    let incorrectOptions = ["$ms^{-2}$", "$\\frac{s}{m}$", "meter seconds", "$ms^{-3}$", "ms", "s/m", "$m^2$"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1cc7ee4eb1e8fa990f79f() {
    const question = "The formula for energy is $ \\frac{m v^2}{2}$. What are the SI units for energy?"
    let correctOptions = ["$kg \\ m^2 \\ s^{-2}$", "$\\frac{kg \\ m^2}{s^2}$"]
    let incorrectOptions = ["$kg \\ m^3 \\ s^{2} $", "$kg \\ m^2 \\ s^{2}$", "$kg^2 \\ m^2 \\ s^{-2}$"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1ccf5e4eb1e8fa990f7ae() {
    const question = "The formula for acceleration is $\\frac{ \\delta v}{ \\delta t}$. What are the units for acceleration?"
    let correctOptions = ["$\\frac{m}{s^2}$", "$m s^{-2}$"]
    let incorrectOptions = ["$\\frac{m}{s}$", "m/s", "$\\frac{kg}{m \\ s^2}$", "ms"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1d2e3e4eb1e8fa990f811() {
    //  TODO
    const question = "Select the number which is in correct scientific notation:"
    let correctOptions = ["$2.3 \\times 10^3$", "$6.395 \\times 10^6$", "$2.48 \\times 10^47$", "$8.39235 \\times 10^8765$", "$7.5345634 \\times 10^{-23}$", "$2.67 \\times 10^{-394}$", "$7.35 \\times 10^{-234}$", "$4.2958 \\times 10^2$", "$6.4372 \\times 10$", "$8 \\times 10^{-1}$", "$2.36780 \\times 10^{-3}$", "$3.6840000 \\times 10^{-2}$"]
    let incorrectOptions = ["$64.372 \\times 10^{294}$", "$0.64372 \\times 10^{-23}$", "$267 \\times 10^{-35}$", "$0.00023847\\times 10^{29}$", "$0.0027847\\times 10^{91}$"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1d7b2e4eb1e8fa990f856() {
    const question = "Which of these are criteria for a number to be in scientific notation? Select all that apply."
    let correctOptions = ["The number component is greater than one but less than ten"]
    let incorrectOptions = ["The number has no trailing zeroes", "The number component is greater than ten", "The power of ten is positive"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1d814e4eb1e8fa990f883(easyHard = false) {
    // Generate variables
    const theSigFigs = randomIntFromInterval(1, 6)
    let theNumber = randomIntFromInterval(0, 10**5) / (10 ** randomIntFromInterval(0, 7))
    if (easyHard === "hard" && randomIntFromInterval(1, 11) % 3 === 0) {
        theNumber = randomIntFromInterval(0, 10 ** 5) / (10 ** randomIntFromInterval(0, 12))
    }

    // Generate question
    const question = `Write ${theNumber} to ${theSigFigs} significant figures.`

    // Generate correct options
    let correctOptions = [String(theNumber.toPrecision(theSigFigs))]
    if (correctOptions[0].includes("e")) {
        correctOptions = [Number(theNumber.toPrecision(theSigFigs)).toFixed()]
    }

    // Generate incorrect options
    let incorrectOptions = ["838740", "838700", "838000", "830000"]

    
    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}


function q65c1d8e0e4eb1e8fa990f8b0() {
    // Generate variables
    let theNumber = randomIntFromInterval(0, 10 ** 5) / (10 ** randomIntFromInterval(0, 5))
    const theSigFigs = randomIntFromInterval(1, 8)
    theNumber = [String(theNumber.toPrecision(theSigFigs))]
    if (theNumber.toString().includes("e")) {
        theNumber = [Number(Number(theNumber).toPrecision(theSigFigs)).toFixed()]
    }

    // if (easyHard === "hard" && randomIntFromInterval(1, 11) % 3 === 0) {
    //     theNumber = randomIntFromInterval(0, 10 ** 5) / (10 ** randomIntFromInterval(0, 12))
    // }

    // Generate question
    const question = `How many significant figures is the number ${theNumber} given to?`

    // Generate correct options
    const theDigits = digits(theNumber)
    let correctOptions = [theDigits]

    // Generate incorrect options
    let incorrectOptions = [theDigits + 1, (theDigits > 1 ? theDigits - 1 : 0), theDigits + 2, (theDigits > 2 ? theDigits-2 : 0)]


    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }

    // digits function
    function digits(value) {
        let length = 0
        let counting = false
        let hitDecimalPoint = false
        for (const i of value.toString()) {
            if (i === ".") {
                counting = true
                hitDecimalPoint = true
                continue
            }
            if (i === "0" && hitDecimalPoint === false) {
                continue
            }
            length += 1
        }
        return length
    }
}

function q65c1d907e4eb1e8fa990f8d1() {
    // Needs to come before sig figs!

    // Generate variables
    let myNumber = 0
    let myPlace = ""

    // Generate question and Generate correct options
    let correctOptions = []
    const randNumber = randomIntFromInterval(0, 3)

    if (randNumber == 0) {
        myNumber = randomIntFromInterval(10, 10000)
        correctOptions.push(Math.round(myNumber / 10) * 10)
        myPlace = "ten"
    }
    if (randNumber == 1) {
        myNumber = randomIntFromInterval(100, 10000)
        correctOptions.push(Math.round(myNumber / 100) * 100)
        myPlace = "hundred"
    }
    if (randNumber == 2) {
        myNumber = randomIntFromInterval(1000, 100000)
        correctOptions.push(Math.round(myNumber / 1000) * 1000)
        myPlace = "thousand"
    }

    // Generate incorrect options
    let incorrectOptions = []
    if (myPlace != "ten") {
        incorrectOptions.push(Math.round(myNumber / 10) * 10)
    }
    if (myPlace != "hundred") {
        incorrectOptions.push(Math.round(myNumber / 100) * 100)
    }
    if (myPlace != "thousand") {
        incorrectOptions.push(Math.round(myNumber / 1000) * 1000)
    }
    incorrectOptions.push(0)
    incorrectOptions.push(Math.round(myNumber / 10) * 10 + 10)
    incorrectOptions.push(Math.round(myNumber / 100) * 100 + 100)
    incorrectOptions.push(Math.round(myNumber / 1000) * 1000 + 1000)

    // Turn into multiselect
    const question = `Round ${myNumber} to the nearest ${myPlace}.`
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1df6f411308294e1bdc80() {
    // Generate variables
    const options = ["Random", "Random and systematic", "Systematic", "Neither"]
    const randIndex = randomIntFromInterval(0, options.length)
    const startingMeasurement = randomIntFromInterval(20, 900)

    // Calculate difference in measurements
    let measurements = Array(5).fill(startingMeasurement)
    for (let i = 0; i < measurements.length; i++) {
        if (startingMeasurement > 200) {
            measurements[i] += plusorMinusRandom(1, 20)
        } else {
            measurements[i] += plusorMinusRandom(1, 5)
        }
    } 

    if (options[randIndex] === "Random" || options[randIndex] === "Random and systematic") {
        measurements[randomIntFromInterval(0, measurements.length)] += plusorMinusRandom(startingMeasurement/2, startingMeasurement)
    }

    // Calculate systematic error
    let expectedMeasurement = startingMeasurement + plusorMinusRandom(0, 5)
    if (expectedMeasurement > 200) {
        expectedMeasurement = startingMeasurement + plusorMinusRandom(0, 10)
    }

    if (options[randIndex] === "Systematic" || options[randIndex] === "Random and systematic") {
        // Difference jumps to between 40 and 50%
        if (expectedMeasurement > 200) {
            expectedMeasurement = startingMeasurement + plusorMinusRandom(50, 200)
        } else {
            expectedMeasurement = startingMeasurement + plusorMinusRandom(10, 20)
        }
    }



    // Generate question
    const questionList = [`A student makes five measurements: ${measurements.join(", ")}. They are different to the value of ${expectedMeasurement} which was expected. The error observed is:`,
        `An IB student is expecting to measure a value of ${expectedMeasurement}. They end up measuring values of ${measurements.join(", ")}.  The error observed is:`]
    const question = questionList[randomIntFromInterval(0, questionList.length)]

    // Generate correct options
    let correctOptions = [options[randIndex]]

    // Generate incorrect options
    let incorrectOptions = options.filter(option => option !== options[randIndex])


    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions) 

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1dfd7411308294e1bdc8f() {
    const question = "A thermometer was not calibrated before being used in an experiment and all of the recorded temperatures were 5 degrees higher than expected. This is an example of"
    let correctOptions = ["Systematic error"]
    let incorrectOptions = ["Random error", "Both", "Neither"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c1e039411308294e1bdc9e() {
    const question = "An IB student used a very dodgy accelerometer with values that fluctuate between 2 and 400 $m s^{-2}$. This is an example of:"
    let correctOptions = ["Random error"]
    let incorrectOptions = ["Systematic error", "Both", "Neither"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

// Uncertainty in multiplication
function q65c1e097411308294e1bdcbf() {

    // Generate variables
    const value1 = randomIntFromInterval(2, 2000) / 10
    const uncertainty1 = randomIntFromInterval(2, 1400) / 10
    const value2 = randomIntFromInterval(2, 2000) / 10
    const uncertainty2 = randomIntFromInterval(2, 1400) / 10
    const percentage = randomIntFromInterval(0, 2) == 1 ? true : false
    const multiplying = randomIntFromInterval(0, 2) == 1 ? true : false

    // Generate question
    const question = `What is the ${percentage ? "percentage" : "fractional"} uncertainty in $${value1} m \\delta ${uncertainty1} m ${multiplying ? "\\times" : "\\div"} ${value2} m \\delta ${uncertainty2} m $ ?`

    // Generate correct options
    let correctOptions = [(uncertainty1 / value1 + uncertainty2 / value2 * (percentage ? 100 : 1)).toPrecision(4)]

    // Generate incorrect options
    let incorrectOptions = []
    for (let i = 0; i < 5; i++) {
        incorrectOptions.push((Math.random() * (percentage ? 100 : 1)).toPrecision(4))
    }
    incorrectOptions.push((value1/uncertainty1 + value2/uncertainty2).toPrecision(4))
    incorrectOptions.push((uncertainty1 / value1 + uncertainty2 / value2 * percentage ? 1 : 100).toPrecision(4))
    incorrectOptions.push("0")
    incorrectOptions.push("undefined")
    for (let i = 0; i < incorrectOptions.length; i++) {
        if (typeof incorrectOptions[i] === "number") {
            incorrectOptions[i] = Math.round(incorrectOptions[i], 4)
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

// Uncertainty in addition
function q65c1e106411308294e1bdce7() {

    // Generate variables
    const value1 = randomIntFromInterval(2, 2000) / 10
    const uncertainty1 = randomIntFromInterval(2, 1400) / 10
    const value2 = randomIntFromInterval(2, 2000) / 10
    const uncertainty2 = randomIntFromInterval(2, 1400) / 10
    const multiplying = randomIntFromInterval(0, 2) == 1 ? true : false

    // Generate question
    const question = `What is the absolute uncertainty in $${value1} m \\delta ${uncertainty1} m ${multiplying ? "+" : "-"} ${value2} m \\delta ${uncertainty2} m $ ?`

    // Generate correct options
    let correctOptions = [Math.round(uncertainty1 + uncertainty2, 4)]

    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push(uncertainty1 - uncertainty2)
    incorrectOptions.push(value1 + value2)
    incorrectOptions.push(value1 - value2)
    incorrectOptions.push(value1 + uncertainty1)
    incorrectOptions.push(value1 - uncertainty1)
    incorrectOptions.push(value2 + uncertainty2)
    incorrectOptions.push(value2 - uncertainty2)
    incorrectOptions.push(0)
    incorrectOptions.push("undefined")
    for (let i = 0; i < incorrectOptions.length; i++) {
        if (typeof incorrectOptions[i] === "number") {
            incorrectOptions[i] = Math.round(incorrectOptions[i], 4)
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

function q65c1e0df411308294e1bdcd8() {
    // Generate variables
    const units = [" m", " km", " s", " mol", " J", " N", " Hz", " A"]
    const nonUnits = ["%", ""]
    const isAbsolute = randomIntFromInterval(0, 2) === 1 ? true : false

    // Generate question
    const question = `Which of these is an example of ${isAbsolute ? "absolute" : "percentage" } uncertainty?`

    // Generate correct options
    let correctOptions = []
    if (isAbsolute) {
        const divisor = randomIntFromInterval(0, 2) === 0 ? 10 : 100
        correctOptions.push((randomIntFromInterval(1, 1000) / divisor).toString() + randomItemOf(units))
    } else {
        const divisor = randomIntFromInterval(0, 2) === 0 ? 10 : 100
        correctOptions.push((randomIntFromInterval(1, 1000) / divisor).toString() + randomItemOf(nonUnits))
    }
    // Generate incorrect options
    let incorrectOptions = []
    for (let i = 0; i < 3; i++) {
        if (isAbsolute) {
            const divisor = randomIntFromInterval(0, 2) === 0 ? 10 : 100
            incorrectOptions.push((randomIntFromInterval(1, 1000) / divisor).toString() + randomItemOf(nonUnits))
        } else {
            const divisor = randomIntFromInterval(0, 2) === 0 ? 10 : 100
            incorrectOptions.push((randomIntFromInterval(1, 1000) / divisor).toString() + randomItemOf(units))
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

function q65c1e13d411308294e1bdcf6() {
    // Generate variables
    const x1 = randomIntFromInterval(1, 100)
    const dx1 = randomIntFromInterval(1, 10) / 10
    const x2 = randomIntFromInterval(1, 100)
    const dx2 = randomIntFromInterval(1, 10) / 10

    // Generate question
    const question = `What is the absolute uncertainty in $${x1} m \delta ${dx1} m + ${x2} m \delta ${dx2} m $ ?`

    // Generate correct options
    let correctOptions = []
    correctOptions.push((dx1 + dx2).formatNicely() + "m")

    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push((x1 + x2).formatNicely() + "m")
    incorrectOptions.push((x1 - x2).formatNicely() + "m")
    incorrectOptions.push((x1/dx1 + x2/dx2).formatNicely() + "m")
    incorrectOptions.push((dx1 / x1 + dx2 / x2).formatNicely() + "m")
    incorrectOptions.push((dx1 * 2).formatNicely() + "m")
    incorrectOptions.push((dx2 * 2).formatNicely() + "m")
    

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}



module.exports = { q65c1ca1de4eb1e8fa990f718, q65c1cb9fe4eb1e8fa990f731, q65c1cc7ee4eb1e8fa990f79f, 
    q65c1ccf5e4eb1e8fa990f7ae, q65c1d2e3e4eb1e8fa990f811, q65c1d7b2e4eb1e8fa990f856, 
    q65c1d814e4eb1e8fa990f883, q65c1d8e0e4eb1e8fa990f8b0, q65c1df6f411308294e1bdc80, 
    q65c1e097411308294e1bdcbf, q65c1e106411308294e1bdce7, q65c1e0df411308294e1bdcd8, q65c1d907e4eb1e8fa990f8d1, 
    q65c1dfd7411308294e1bdc8f, q65c1e039411308294e1bdc9e, q65c1e13d411308294e1bdcf6 }