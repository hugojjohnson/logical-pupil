// Generate variables
// Generate question
// Generate correct options
// Generate incorrect options
// Turn into multiselect

function plusorMinusRandom(low, up) {
    let num = randomIntFromInterval(low, up)
    if (randomIntFromInterval(0, 2) === 1) {
        num = -num
    }
    return num
}

function randomIntFromInterval(min, max) { // min included, max not
    return Math.floor(Math.random() * (max - min) + min)
}
function randomItemOf(arr) {
    return arr[randomIntFromInterval(0, arr.length)]
}

function generateMultiselect(correctOptions, incorrectOptions, OPTION_LENGTH = 4, CORRECT_LENGTH = 1) {
    // Definitely could be improved (selecting a random item from an array, I could instead shuffle them at the end..)
    // But it works so I'm keeping it

    const correctOptionsBackup = [...correctOptions]
    let returnOptions = []
    let returnCorrect = []

    // add incorrect options
    for (let i = 0; i < (OPTION_LENGTH - CORRECT_LENGTH); i++) {
        const randNumber = randomIntFromInterval(0, incorrectOptions.length)
        returnOptions.splice(randomIntFromInterval(0, returnOptions.length + 1), 0, incorrectOptions[randNumber]) // add option in random position to returnOptions
        incorrectOptions.splice(randNumber, 1); // remove option from incorrect options
    }
    // add correct options
    for (let i = 0; i < CORRECT_LENGTH; i++) {
        const randNumber = randomIntFromInterval(0, correctOptions.length)
        returnOptions.splice(randomIntFromInterval(0, returnOptions.length + 1), 0, correctOptions[randNumber])
        correctOptions.splice(randNumber, 1); // 2nd parameter means remove one item only
    }
    // find indexes of and concat correct options
    for (const correctOption of correctOptionsBackup) {
        const index = returnOptions.indexOf(correctOption);
        if (index > -1) { // only splice array when item is found
            returnCorrect.push(index.toString()); // 2nd parameter means remove one item only
        }
    }
    return [returnOptions, returnCorrect]
}

// Takes a number in standard form (as a string e.g. "450 nm") and converts it to a number.
// Also does the opposite.
function standardForm(input) {
    const units = ["m", "s", "Hz", "Pa"]
    const prefixes = {
        "P": 15,
        "T": 12,
        "G": 9,
        "M": 6,
        "k": 3,
        "c": -2,
        "m": -3,
        "µ":-6,
        "n": -9,
        "p": -12,
        "f": -15
    }
    if (typeof input === "string") {
        let unit = ""
        // Remove units
        for (const unit of units) {
            if (input.indexOf(unit) === -1) {
                continue
            }
            input = input.substring(0, input.length - unit.length)
        }

        const multiplier = prefixes[input.slice(-1)]
        const value = input.slice(0, -1)
        return parseFloat(value) * 10 ** multiplier
    }
    // Otherwise, assume it's a number.
}

Number.prototype.formatNicely = function(withPrefixes = true) {
    // Takes a number e.g. 3.45e+4 and turns it into 34500
    // If the number is too big (e > 7 i guess?) it will put it in scientific notation.

    f = this.valueOf()
    f = f.toPrecision(3)
    myArgs = f.split("+")
    if (myArgs.length == 1) {
        return f + " "
    }
    myNum = parseFloat(myArgs[0])
    myExp = parseInt(myArgs[1])

    if (!withPrefixes) {
        if (myExp <= 4) {
            f = myNum * 10**myExp
        } else {
            f = myNum.toString() + " x 10^" + myExp.toString()
        }
        return f

    }

    if (myExp < 3) {
        f = (myNum * 10**(myExp)).toPrecision(3) + "   ."
    } else if (myExp < 6) {
        f = (myNum * 10**(myExp - 3)).toPrecision(3) + " k"
    } else if (myExp < 9) {
        f = (myNum * 10**(myExp - 6)).toPrecision(3) + " M"
    } else if (myExp < 12) {
        f = (myNum * 10**(myExp - 9)).toPrecision(3) + " G"
    } else if (myExp < 15) {
        f = (myNum * 10**(myExp - 12)).toPrecision(3) + " T"
    } else if (myExp < 18) {
        f = (myNum * 10**(myExp - 15)).toPrecision(3) + " P"
    } else {
        f = myNum.toPrecision(3) + "x10^" + myExp.toPrecision(3)
    }
    return f
}

module.exports = { plusorMinusRandom, randomIntFromInterval, randomItemOf, generateMultiselect }