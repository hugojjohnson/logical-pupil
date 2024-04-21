import { useEffect, useState } from "react"
import { MathJax } from "better-react-mathjax"

export default function MultiselectQuestion({ question, callbackFunction }) {


    // This isn't being used at the moment!

    const [selected, setSelected] = useState([])
    const [correct, setCorrect] = useState(undefined)
    const [feedback, setFeedback] = useState("")
    
    useEffect(() => {
        setSelected([])
        setFeedback("")
        setCorrect(undefined)
    }, [question])


    // Helper functions
    function mathjaxify(myString) {
        if (myString === null || myString === undefined) {
            myString = "$$"
        }
        myString = myString.replace("$", "\\(")
        myString = myString.replace("$", "\\)")
        return myString
    }

    function check() {
        for (const correctAns of question.correct) {
            if (question.correct.includes(correctAns.toString()) && selected.includes(parseInt(correctAns.toString()))) {
                continue
            } else {
                return setCorrect(false)
            }
        }
        for (const correctAns of selected) {
            if (question.correct.includes(correctAns.toString()) && selected.includes(parseInt(correctAns.toString()))) {
                continue
            } else {
                return setCorrect(false)
            }
        }
        setCorrect(true)
    }

    // HTML components
    const questionsHTML = () => {
        // Helper functions
        function getColour(index) {
            index = index.toString()

            if (question.correct.includes(index) && selected.includes(parseInt(index))) {
                return "border-green-300 bg-green-50"
            } else if (!question.correct.includes(index) && selected.includes(parseInt(index))) {
                return "border-red-300 bg-red-50"
            } else if (question.correct.includes(index) && !selected.includes(parseInt(index))) {
                return "border-blue-300 bg-blue-50"
            } else {
                return "border-grey-300 bg-grey-50"
            }
        }
        const selectQuestion = (index) => {
            let copy = [...selected]            
            if (copy.includes(index)) {
                copy = copy.filter(entry => entry !== index)
                setSelected(copy)
            } else {
                copy.push(index)
                setSelected(copy)
            }
        }

        // Return
        if (correct === undefined) {
            return (<>
            {
                question.options.map((option, index) => {
                    return (<div key={index} className={`p-3 rounded-full border-2 ${selected.includes(index) ? "border-blue-300 bg-blue-50" : "border-gray-200"} flex flex-row justify-between w-72`} onClick={() => selectQuestion(index)}>
                        <MathJax>{mathjaxify(option)}</MathJax>
                    </div>)
                })
            }
            </>)
        }
        return (<>
        {
            question.options.map((option, index) => {
                return (<div key={index} className={`p-3 rounded-full border-2 ${getColour(index)} flex flex-row justify-between w-72`} onClick={() => selectQuestion(index)}>
                    <MathJax>{mathjaxify(option)}</MathJax>

                    <p className={`ml-2 bg-none`}>{selected.includes(index) ? "•" : ""}</p>
                </div>)
            })
        }
        </>)
    }
    const feedbackHTML = () => {
        if (correct === undefined) { return <></> }

        if (correct) {
            return <button onClick={() => callbackFunction("correct")}>Next</button>
        } else {
            return <button onClick={() => callbackFunction("again")}>Try again</button>
        }
    }

    // Return value
    return(<div className="w-full max-w-screen-sm mx-auto min-h-screen flex flex-col gap-2 items-start py-20">
        <MathJax inline={true} className="text-lg self-center mb-5">{mathjaxify(question.question)}</MathJax>

        { questionsHTML() }
        <button className="p-2 border-2 bg-gray-100 border-gray-200 rounded-md" onClick={check}>Submit</button>

        {feedbackHTML()}

        {
            feedback !== "" && (<>
                <p>{feedback}</p>
            </>)
        }
    </div>)

}