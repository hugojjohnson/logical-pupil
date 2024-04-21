import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ApiUrlContext, UserContext } from "../../../Context"

export default function AddMultiselectForm({ skillId, callbackFunction, easyHard }) {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)


    const [question, setQuestion] = useState("")
    const [options, setOptions] = useState(["one", "two", "three", "four"])
    const [correct, setCorrect] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const temp = correct.slice()
        while (temp.length !== options.length) {
            if (temp.length < options.length) {
                temp.push(false)
            } else {
                temp.pop()
            }
        }
        setCorrect(temp)
    }, [options.length])

    return (<>
        <h3 className="font-bold">Question</h3>
        <input className="mb-5 w-full border-2 border-gray-200 rounded-md" value={question} onChange={(e) => setQuestion(e.target.value)} />

        <div className="flex flex-row gap-2 items-center">
            <h3 className="font-bold">Options</h3>
            <button className="" onClick={() => {
                let copy = [...options]
                copy.push("---")
                setOptions(copy)
            }}>+</button>
            <button className="" onClick={() => {
                let copy = [...options]
                copy.pop()
                setOptions(copy)
            }}>-</button>
        </div>
        {
            options.map((option, index) => {
                return <input key={index} value={option} onChange={e => {
                    let copy = options.slice()
                    copy[index] = e.target.value
                    setOptions(copy)
                }
                } />
            })
        }

        <h3 className="font-bold">Correct</h3>
        <div className="mb-5 w-[20%] border-2 border-gray-200 rounded-md" onChange={(e) => setCorrect(e.target.value)}>
            {
                correct.map((_, index) => {
                    return <p className={`${correct[index] === true ? "bg-green-200" : ""}`} key={index} onClick={() => {
                        let copy = [...correct]
                        copy[index] = !copy[index]
                        setCorrect(copy)
                    }}>{index + 1}</p>
                })
            }
        </div>

        <button className="p-2 bg-gray-300 hover:bg-gray-400 w-20 self-center rounded-md" onClick={submitSkill}>Submit</button>

        <p>{errorMessage}</p>

    </>)

    async function submitSkill() {

        const correctIndices = []
        for (let i = 0; i < correct.length; i++) {
            if (correct[i] === true) {
                correctIndices.push(i)
            }
        }

        try {
            const sendQuestion = {
                type: "multiselect",
                skill: skillId,
                question: question,
                options: options,
                correct: correctIndices
            }
            const response = await axios.post(apiUrl + "admin/add-question", {
                token: user.token,
                easyHard: (easyHard === "easy" ? "easy" : "hard"),
                question: sendQuestion
            })
            callbackFunction()
        } catch (err) {
            console.error(err)
            setErrorMessage(err.message)
        }
    }
}