const { plusorMinusRandom, randomIntFromInterval, randomItemOf, generateMultiselect } = require("./helperFunctions")

// Generate variables
// Generate question
// Generate correct options
// Generate incorrect options
// Turn into multiselect


function q6604d92e75b98877b27dff8a() {
    // Generate variables
    const B = randomIntFromInterval(1, 100) / 10
    // in centimeters
    const r = randomIntFromInterval(1, 100) / 10
    const angle = randomIntFromInterval(0, 2) === 1 ? 0 : randomIntFromInterval(1, 19) * 5

    // Generate question
    const question = `A magnetic field of ${B} T passes ${angle === 0 ? "perpendicular" : `at an angle of ${angle} degrees to perpendicular, `} to a disc with a radius of ${r} cm. Find the magnetic flux passing through the disk.`

    // Generate correct options
    let correctOptions = []
    const A = Math.PI * (r / 100)**2
    const theta = angle * Math.PI / 180
    correctOptions.push(`${(B * A * Math.cos(theta)).toPrecision(3)} Wb`)
    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push(`${((B+1) * A * Math.cos(theta)).toPrecision(3)} Wb`)
    incorrectOptions.push(`${(B * (A*4) * Math.cos(theta)).toPrecision(3)} Wb`)
    incorrectOptions.push(`${(B * (A+2) * Math.cos(theta)).toPrecision(3)} Wb`)
    if (angle !== 0){
        incorrectOptions.push(`${(B * A * Math.cos(angle)).toPrecision(3)} Wb`)
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

// TODO: Add sin theta in here too.
function q6604e46676f08e5c3b42f4fe() {
    // Generate variables
    B = randomIntFromInterval(1, 1000) / 100
    v = randomIntFromInterval(1, 100)
    L = randomIntFromInterval(1, 100)
    // Generate question
    const question = `Calculate the emf induced along a ${L} m long wire moving through a $${B} \\times 10^{−5}$ T magnetic field at ${v} m/s.`

    // Generate correct options
    let correctOptions = []
    correctOptions.push(`${(B * v * L / 10**5).toPrecision(3)} V`)
    // Generate incorrect options
    // Turn into multiselect
    let incorrectOptions = []
    incorrectOptions.push(`${(B * v * L / 10**5 * 2).toPrecision(3)} V`)
    incorrectOptions.push(`${(B * v * L / 10**5 / 2).toPrecision(3)} V`)
    incorrectOptions.push(`${(B * (v + 2) * L / 10**5).toPrecision(3)} V`)
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q6604e785d293083570088791() {
    // Generate variables
    const loops = randomIntFromInterval(1, 100)
    const timeTaken = randomIntFromInterval(1, 1000) / 1000
    const startingField = randomIntFromInterval(1, 100) / 100
    const finishingField = startingField + randomIntFromInterval(1, 100) / 100

    // Generate question
    const question = `A magnet moves through a coil containing ${loops} loops in ${timeTaken} seconds. During this time, the magnetic field experienced by the coil increases from ${startingField} T to ${finishingField} T. What is the EMF induced by the magnet on the coil?`
    
    // Generate correct options
    let correctOptions = []
    const myAns = (loops * (finishingField - startingField) / timeTaken).toPrecision(3)
    correctOptions.push(`${myAns} V`)

    // Generate incorrect options
    let incorrectOptions = []
    incorrectOptions.push(`${(myAns * 2).toPrecision(3)} V`)
    incorrectOptions.push(`${(myAns / 2).toPrecision(3)} V`)
    incorrectOptions.push(`${(myAns * 1.5).toPrecision(3)} V`)

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q6604ea7fca6738b08fb1ff02() {
    // Generate variables
    const amplitude = randomIntFromInterval(100, 999)
    // Generate question
    let question = `The value of an alternating current is given by $I = ${amplitude} sin(350 \pi t)$, where I is in Amps, and t in seconds. What is the r.m.s. current?`
    if (randomIntFromInterval(0, 2) === 1) {
        question = `What is the RMS current of an alternating current whose maximum current is ${amplitude} A?`
    }

    // Generate correct options
    let correctOptions = []
    const myAns = (amplitude/Math.sqrt(2)).toPrecision(3)
    correctOptions.push(`${myAns} A`)

    // Generate incorrect options
    let incorrectOptions = []
    let tempAns = (amplitude / Math.sqrt(3)).toPrecision(3)
    incorrectOptions.push(`${tempAns} A`)

    tempAns = (amplitude).toPrecision(3)
    incorrectOptions.push(`${tempAns} A`)

    tempAns = (amplitude / 1.5).toPrecision(3)
    incorrectOptions.push(`${tempAns} A`)

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q6604ec84833f554e4c385134() {
    // Generate variables
    const maxV = randomIntFromInterval(1, 100)
    const maxI = randomIntFromInterval(1, 100)

    // Generate question
    const question = `What is the average power output of an alternating current with maximum voltage ${maxV} V and maximum current ${maxI} A?`

    // Generate correct options
    let correctOptions = []
    const myAns = (maxV * maxI / 2).toPrecision(3)
    correctOptions.push(`${myAns} W`)

    // Generate incorrect options
    let incorrectOptions = []
    let tempAns = (maxV * maxI / Math.sqrt(2)).toPrecision(3)
    incorrectOptions.push(`${tempAns} W`)

    tempAns = (maxV * maxI).toPrecision(3)
    incorrectOptions.push(`${tempAns} W`)

    tempAns = (maxV * maxI / 2.6).toPrecision(3)
    incorrectOptions.push(`${tempAns} W`)

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q6604ec88833f554e4c385139() {
    // Generate variables
    const rmsV = randomIntFromInterval(1, 100)
    const rmsI = randomIntFromInterval(1, 100)
    // Generate question
    const question = `What is the maximum power output of an alternating current with RMS voltage ${rmsV} V and RMS current ${rmsI} V?`

    // Generate correct options
    let correctOptions = []
    const myAns = (rmsV * rmsI * 2).toPrecision(3)
    correctOptions.push(`${myAns} W`)

    // Generate incorrect options
    let incorrectOptions = []
    let tempAns = (rmsV * rmsI / Math.sqrt(2)).toPrecision(3)
    incorrectOptions.push(`${tempAns} W`)

    tempAns = (rmsV * rmsI).toPrecision(3)
    incorrectOptions.push(`${tempAns} W`)

    tempAns = (rmsV * rmsI / 2).toPrecision(3)
    incorrectOptions.push(`${tempAns} W`)

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}
module.exports = { q6604d92e75b98877b27dff8a, q6604e46676f08e5c3b42f4fe, q6604e785d293083570088791, q6604ea7fca6738b08fb1ff02, q6604ec84833f554e4c385134, q6604ec88833f554e4c385139 }