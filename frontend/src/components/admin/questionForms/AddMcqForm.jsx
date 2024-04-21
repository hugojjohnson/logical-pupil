import axios from "axios"
import { useContext, useState } from "react"
import { ApiUrlContext, UserContext } from "../../../Context"

export default function AddMcqForm({ skillId, callbackFunction, easyHard }) {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)


    const [question, setQuestion] = useState("")
    const [options, setOptions] = useState(["one", "two", "three", "four"])
    const [correct, setCorrect] = useState(-1)
    const [errorMessage, setErrorMessage] = useState("")
    return (<>
        <h3 className="font-bold">Question</h3>
        <input className="mb-5 w-[20%] border-2 border-gray-200 rounded-md" value={question} onChange={(e) => setQuestion(e.target.value)} />

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
        <select className="mb-5 w-[20%] border-2 border-gray-200 rounded-md" onChange={(e) => setCorrect(e.target.value)}>
            {
                options.map((_, index) => {
                    return <option key={index}>{index + 1}</option>
                })
            }
        </select>

        <button className="p-2 bg-gray-300 hover:bg-gray-400 w-20 self-center rounded-md" onClick={submitSkill}>Submit</button>

        <p>{errorMessage}</p>

    </>)

    async function submitSkill() {

        try {
            const sendQuestion = {
                type: "mcq",
                skill: skillId,
                question: question,
                options: options,
                correct: correct
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