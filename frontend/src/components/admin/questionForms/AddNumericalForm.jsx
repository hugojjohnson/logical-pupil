import axios from "axios"
import { useContext, useState } from "react"
import { ApiUrlContext, UserContext } from "../../../Context"

export default function AddNumericalForm({ skillId, callbackFunction, easyHard }) {

    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)


    const [question, setQuestion] = useState("")
    const [variables, setVariables] = useState([])
    const [answer, setAnswer] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    return (<>
        <h3 className="font-bold">Question</h3>
        <input className="mb-5 w-[20%] border-2 border-gray-200 rounded-md" value={question} onChange={(e) => setQuestion(e.target.value)} />

        <div className="flex flex-row gap-2 items-center">
            <h3 className="font-bold">Variables</h3>
            <button className="" onClick={() => {
                let copy = [...variables]
                copy.push({name: "name", values: "values"})
                setVariables(copy)
            }}>+</button>
            <button className="" onClick={() => {
                let copy = [...variables]
                copy.pop()
                setVariables(copy)
            }}>-</button>
        </div>
        {
            variables.map((variable, index) => {
                return <div key={index}>
                    <input value={variable.name} onChange={e => {
                        let copy = variables.slice()
                        copy[index].name = e.target.value
                        setVariables(copy)
                    }
                    } />
                    <input value={variable.values} onChange={e => {
                        let copy = variables.slice()
                        copy[index].values = e.target.value
                        setVariables(copy)
                    }
                    } />
                </div>
            })
        }

        <h3 className="font-bold">Answer</h3>
        <input className="mb-5 w-[20%] border-2 border-gray-200 rounded-md" value={answer} onChange={(e) => setAnswer(e.target.value)} />

        <button className="p-2 bg-gray-300 hover:bg-gray-400 w-20 self-center rounded-md" onClick={submitSkill}>Submit</button>

        <p>{errorMessage}</p>

    </>)

    async function submitSkill() {
        setErrorMessage("")
        try {
            for (let i = 0; i < variables.length; i++) {
                variables[i].values = JSON.parse("[" + variables[i].values + "]")
            }
        } catch (err) {
            setErrorMessage("Error parsing values for one of your variables.")
            console.error(err)
            return
        }


        try {
            const sendQuestion = {
                type: "numerical",
                skill: skillId,
                variables: variables,
                answer: answer,
                question: question
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