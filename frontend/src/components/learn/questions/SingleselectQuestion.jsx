import { useEffect, useState } from "react"
import { MathJax } from "better-react-mathjax"

export default function MultiselectQuestion({ question, callbackFunction }) {

    const [selected, setSelected] = useState(-1)
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        setSelected(-1)
        setFeedback("")
    }, [question])


    // Helper functions
    function mathjaxify(myString) {
        if (typeof myString === "number") {
            myString = myString.toString()
        }
        if (myString === null || myString === undefined) {
            myString = "$$"
        }
        try {
            myString = myString.replace("$", "\\(")
            myString = myString.replace("$", "\\)")
        } catch (err) {
            console.error(err)
        }
        return myString
    }

    // HTML components
    const questionsHTML = () => {
        // Helper functions
        function getColour(index) {
            if (selected === -1) {
                return "border-gray-200"
            }
            index = index.toString()
            if (parseInt(index) === selected && question.correct.includes(index)) {
                return "border-green-300 bg-green-50"
            } else if (parseInt(index) === selected && !question.correct.includes(index)) {
                return "border-red-300 bg-red-50"
            } else if (question.correct.includes(index)) {
                return "border-blue-300 bg-blue-50"
            } else {
                return "border-grey-300 bg-grey-50"
            }

            // function check() {
            //     for (const correctAns of question.correct) {
            //         if (question.correct.includes(correctAns.toString()) && selected.includes(parseInt(correctAns.toString()))) {
            //             continue
            //         } else {
            //             return setCorrect(false)
            //         }
            //     }
            //     for (const correctAns of selected) {
            //         if (question.correct.includes(correctAns.toString()) && selected.includes(parseInt(correctAns.toString()))) {
            //             continue
            //         } else {
            //             return setCorrect(false)
            //         }
            //     }
            //     setCorrect(true)
            // }
        }

        // Return
        if (selected === -1) {
            return (<>
                {
                    question.options.map((option, index) => {
                        return (<div key={index} className={`p-3 rounded-full border-2 ${"border-gray-200"} flex flex-row justify-between w-72`} onClick={() => {

                            setSelected(index)
                            // check()
                        }}>
                            <MathJax>{mathjaxify(option)}</MathJax>
                        </div>)
                    })
                }
            </>)
        }
        return (<>
            {
                question.options.map((option, index) => {
                    return (<div key={index} className={`p-3 rounded-full border-2 ${getColour(index)} flex flex-row justify-between w-72`}>
                        <MathJax>{mathjaxify(option)}</MathJax>

                        <p className={`ml-2 bg-none`}>{selected === index ? "•" : ""}</p>
                    </div>)
                })
            }
        </>)
    }
    const feedbackHTML = () => {
        if (selected === -1) { return <></> }

        if (question.correct.includes(selected.toString())) {
            return <div className="w-72 flex flex-row justify-around">
                <button onClick={() => callbackFunction("correct")}>Next</button>
                <button onClick={() => callbackFunction("again")}>Again</button>
            </div>
        } else {
            return <button onClick={() => callbackFunction("incorrect")}>Try again</button>
        }
    }

    // Return value
    return (<div className="w-full max-w-screen-sm mx-auto min-h-screen flex flex-col gap-2 items-start py-20">
        <MathJax inline={true} className="text-lg self-center mb-5">{mathjaxify(question.question)}</MathJax>

        {questionsHTML()}
        {/* <button className="p-2 border-2 bg-gray-100 border-gray-200 rounded-md" onClick={check}>Submit</button> */}

        {feedbackHTML()}

        {
            feedback !== "" && (<>
                <p>{feedback}</p>
            </>)
        }
    </div>)

}