const { plusorMinusRandom, randomIntFromInterval, randomItemOf, generateMultiselect } = require("./helperFunctions")

function q65c1f266411308294e1bde07() {
    const question = "Which of these explains the molecular theory of solids, liquids and gases?"
    let correctOptions = ["solids: the molecules are in tightly bound lattice structures.", "liquids: the molecules are able to slide loosely next to one another.", "gases: the molecules move quickly and against gravity."]
    let incorrectOptions = ["solids: the molecules are able to slide loosely next to one another.", "solids: the molecules move quickly and against gravity.", "liquids: the molecules are in tightly bound lattice structures.", "liquids: the molecules move quickly and against gravity.", "gases: the molecules are in tightly bound lattice structures.", "gases: the molecules are able to slide loosely next to one another."]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c200d5411308294e1bde16() {
    // Generate variables
    const states = ["solids", "liquids", "gases"]
    const descriptions = ["strongest", "quite weak", "weakest"]
    const cOne = randomIntFromInterval(0, states.length)
    const cTwo = randomIntFromInterval(0, states.length)

    // Generate question
    const question = `In ${states[cOne]}, the bonds between molecules are _____ in ${states[cTwo]}, they are _____.`

    // Generate correct options
    let correctOptions = []
    correctOptions.push(descriptions[cOne] + ", " + descriptions[cTwo])

    // Generate incorrect options
    let incorrectOptions = []
    while (incorrectOptions.length < 3) {
        let tempOne = randomIntFromInterval(0, states.length)
        let tempTwo = randomIntFromInterval(0, states.length)
        if (tempOne == tempTwo) {
            continue
        }
        if (!correctOptions.includes(descriptions[tempOne] + ", " + descriptions[tempTwo])) {
            incorrectOptions.push(descriptions[tempOne] + ", " + descriptions[tempTwo])
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

function q65c20113411308294e1bde25() {
    const question = "____ and ____ can change their shape to occupy the volume of their container."
    let correctOptions = ["liquids, gases"]
    let incorrectOptions = ["solids, gases", "liquids, solids", "solids, plasma"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c20170411308294e1bde34() {
    const question = "___ can be easily compressed."
    let correctOptions = ["gases"]
    let incorrectOptions = ["liquids and gases", "solids", "nothing"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}


function q65c20410411308294e1bde76() {
    const question = "Specific heat capacity (c):"
    let correctOptions = ["depends only on the substance", "is the amount of energy required to heat one kilogram of a substance by one degree celsius"]
    let incorrectOptions = ["is the amount of energy required to heat a substance specifically", "is the same for all solids", "is the amount of energy required to heat one kilogram of a substance", "is the amount of energy required to heat a substance by one degree celsius", "is the amount of power required to heat one kilogram of a substance by one degree celsius"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c206e5411308294e1bde97() {
    // Generate variables
    const small = randomIntFromInterval(0, 2) === 1 ? true : false
    const smallAns = ["heats up easily", "need very little energy to heat up", "can be heated to any temperature"]
    const largeAns = ["doesn't heat up easily", "need a lot of energy to heat up", "can be heated to any temperature"]
    
    // Generate question
    const question = `A ${small ? "small" : "large"} specific heat capacity (c) means that a substance`
    // Generate correct options
    let correctOptions = []
    if (small) {
        correctOptions.push(randomItemOf(smallAns))
    } else {
        correctOptions.push(randomItemOf(largeAns))
    }

    // Generate incorrect options
    let incorrectOptions = []
    if (small) {
        incorrectOptions = largeAns
    } else {
        incorrectOptions = smallAns
    }
    incorrectOptions.push("heats up to a specific temperature")

    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c207ff411308294e1bdeb8() {
    // Generate variables
    const materials = ["air", "copper", "gold", "iron", "water"]
    const cValues = [1, 0.39, 0.13, 0.45, 4.18] // https://en.wikipedia.org/wiki/Table_of_specific_heat_capacities
    const randNumber = randomIntFromInterval(0, materials.length)
    const mass = randomIntFromInterval(100, 999) // Starting off in GRAMS. TODO: Add kilograms.
    const tempDiff = randomIntFromInterval(2, 90)

    // Generate question
    const question = `How much energy is required to heat ${mass} grams of ${materials[randNumber]} by ${tempDiff} degrees celsius? ($c_{${materials[randNumber]}} = ${cValues[randNumber]} J g^{-1} C^{-1}$)`

    // Generate correct options
    let correctOptions = []
    correctOptions.push((mass * cValues[randNumber] * tempDiff).toFixed())

    // Generate incorrect options
    let incorrectOptions = []
    for (let i = 0; i < 3; i++) {
        incorrectOptions.push((parseFloat(correctOptions[0]) + plusorMinusRandom(1, 200)).toFixed())
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

function q65c20853411308294e1bdec7() {
    const question = "What is the unit for specific heat capacity?"
    let correctOptions = ["J/(kg C)"]
    let incorrectOptions = ["J", "kg C / J", "J kg C"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c208a7411308294e1bdee8() {
    // Generate variables
    const fromKelvin = randomIntFromInterval(0, 2) === 1 ? true : false
    let tempStartingTemp = randomIntFromInterval(0, 400)
    if (!fromKelvin) {
        tempStartingTemp = randomIntFromInterval(-273, 400)
    }
    const startingTemp = tempStartingTemp

    // Generate question
    const question = `${startingTemp} degrees ${fromKelvin ? "Kelvin" : "Celsius"} is also:`

    // Generate correct options
    let correctOptions = []
    if (fromKelvin) {
        correctOptions.push((startingTemp + 273) + " degrees Celsius")
    } else {
        correctOptions.push((startingTemp - 273) + " degrees Kelvin")
    }
    // Generate incorrect options
    let incorrectOptions = []
    while (incorrectOptions.length < 3) {
        if (fromKelvin) {
            incorrectOptions.push((startingTemp + 273 + plusorMinusRandom(1, 10)) + " degrees Celsius")
        } else {
            incorrectOptions.push((startingTemp - 273 + plusorMinusRandom(1, 10)) + " degrees Kelvin")
        }
    }
    if (fromKelvin) {
        incorrectOptions.push((startingTemp - 273) + " degrees Celsius")
    } else {
        incorrectOptions.push((startingTemp + 273) + " degrees Kelvin")
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

function q65c20942411308294e1bdef7() {
    // Generate variables
    const startTemp = randomIntFromInterval(30, 700)

    // Generate question, correct options and incorrect options.
    let question = ""
    let correctOptions = []
    let incorrectOptions = ["27 degrees Celsius", "32 degrees Celsius", "37 degrees Celsius", "573 degrees Celsius"]

    if (randomIntFromInterval(0, 1) === 0) {
        question = `${startTemp} degrees Celsius in Kelvin is `
        correctOptions.push(`${startTemp + 273} degrees Kelvin`)
        incorrectOptions.push(`${startTemp - 273} degrees Kelvin`)
        incorrectOptions.push(`${startTemp + 273 + randomIntFromInterval(1, 100)} degrees Kelvin`)
        incorrectOptions.push(`${startTemp} degrees Kelvin`)
    } else {
        question = `${startTemp} degrees Kelvin in Celsius is `
        correctOptions.push(`${startTemp - 273} degrees Celsius`)
        incorrectOptions.push(`${startTemp + 273} degrees Celsius`)
        incorrectOptions.push(`${startTemp - 273 + randomIntFromInterval(1, 100)} degrees Celsius`)
        incorrectOptions.push(`${startTemp} degrees Celsius`)
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

// I don't think this is original either
function q65c20a4f411308294e1bdf47() {
    const question = "When things melt, the bonds between molecules are ____ and the temperature ____"
    let correctOptions = ["broken, stays constant"]
    let incorrectOptions = ["formed, stays constant", "broken, increases", "formed, increases", "broken, decreases", "formed, decreases"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}


function q65c20b99411308294e1bdf89() {
    // Generate variables
    const L = 2260 // https://en.wikipedia.org/wiki/Enthalpy_of_vaporization
    const mass = randomIntFromInterval(100, 999) // Starting off in GRAMS. TODO: Add kilograms.

    // Generate question
    const question = `A ${mass} mL beaker of water is at 100 degrees. ___ Joules of energy is needed to boil it, after which it will be at ___ degrees. $L_{vaporisation of water} = ${L} J g^{-1}$`

    // Generate correct options
    let correctOptions = []
    correctOptions.push(mass * L + " J")
    correctOptions.push((mass * L / 1000) + " kJ")

    // Generate incorrect options
    let incorrectOptions = []
    while (incorrectOptions.length < 5) {
        const incorrectMass = (mass + plusorMinusRandom(2, 200)) * L
        incorrectOptions.push(incorrectMass + " J")
        incorrectOptions.push(incorrectMass/1000 + " mJ")
    }
    incorrectOptions.push("Impossible to say")
    
    // Turn into multiselect
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)

    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c20bcc411308294e1bdf98() {
    const question = "The units for the latent heat of fusion/vaporisation (L) are"
    let correctOptions = ["J/kg", "Joules per kilogram", "$\\frac{J}{kg}$", "$J kg^{-1}$"]
    let incorrectOptions = ["J kg", "J", "kg", "Joule kilograms", "$\\frac{kg}{J}$", "$\\frac{1}{J}$"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

function q65c2119b411308294e1bdfdd() {
    const question = "Internal energy is defined as"
    let correctOptions = ["total potential energy + total kinetic energy"]
    let incorrectOptions = ["the energy inside a substance", "total energy - kinetic energy", "all of the above"]
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}

module.exports = { q65c1f266411308294e1bde07, q65c200d5411308294e1bde16, q65c20410411308294e1bde76, q65c206e5411308294e1bde97,
    q65c207ff411308294e1bdeb8, q65c20853411308294e1bdec7, q65c208a7411308294e1bdee8, q65c20b99411308294e1bdf89, 
    q65c20bcc411308294e1bdf98, q65c2119b411308294e1bdfdd, q65c20113411308294e1bde25, q65c20170411308294e1bde34, 
    q65c20942411308294e1bdef7, q65c20a4f411308294e1bdf47}