import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"

import { UserContext, ApiUrlContext } from "../../Context"

import AddMcqForm from "./questionForms/AddMcqForm";
import AddMultiselectForm from "./questionForms/AddMultiselectForm";
import AddNumericalForm from "./questionForms/AddNumericalForm";


export default function Subtopic() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)
    const { skillId } = useParams();

    const [skillInfo, setSkillInfo] = useState({})
    const [easyQuestions, setEasyQuestions] = useState([])
    const [hardQuestions, setHardQuestions] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [easyHard, setEasyHard] = useState(undefined)

    useEffect(() => {
        async function getData() {
            try {
                let response = await axios.post(apiUrl + "admin/get-questions", { token: user.token, skillId: skillId })
                const questions = response.data
                response = await axios.post(apiUrl + "admin/get-skill-info", { token: user.token, skillId: skillId })
                setEasyQuestions(response.data.easy.map(qId => {
                    return questions.filter(ques => ques["_id"] === qId)[0]
                }))
                setHardQuestions(response.data.variations.map(qId => {
                    return questions.filter(ques => ques["_id"] === qId)[0]
                }))
                setSkillInfo(response.data)
            } catch (err) {
                setErrorMessage(err.message || err)
            }
        }
        getData()
    }, [apiUrl, user.token, skillId, easyHard])


    // if (easyHard !== undefined) {
    //     return (<>
    //         <div className="absolute w-full h-full bg-gray-500 opacity-60"></div>
    //         <GeneralForm skillId={skillId} callbackFunction={() => setEasyHard(undefined)} easyHard={easyHard} />
    //     </>)
    // }

    return (<>
        {
            easyHard !== undefined && (<>
                <div className="absolute w-full h-full bg-gray-500 opacity-60" onClick={() => setEasyHard(undefined)}></div>
                <GeneralForm skillId={skillId} callbackFunction={() => setEasyHard(undefined)} easyHard={easyHard} />
            </>)
        }
        <div className="mx-auto max-w-screen-2xl">
        <h1 className="w-full text-center mx-auto mt-5 text-2xl bold">{skillInfo.name}</h1>
        <div className="m-5 p-5 bg-green-100 border-2 border-green-500 rounded-md">
            <h1 className="text-green-600 underline text-xl font-bold mb-2">Easy</h1>
            {
                easyQuestions.map((easyQuestion, index) => {
                    return <p key={index}>{easyQuestion.question} - {easyQuestion["_id"]}</p>
                })
            }
            <button className="bg-gray-200 p-5" onClick={() => setEasyHard("easy")}>Add Question</button>
        </div>

        <div className="m-5 p-5 bg-blue-100 border-2 border-blue-500 rounded-md">
            <h1 className="text-blue-600 underline text-xl font-bold mb-2">Variations</h1>
            {
                hardQuestions.map((hardQuestion, index) => {
                    return <p key={index}>{hardQuestion.question} - {hardQuestion["_id"]}</p>
                })
            }
            <button className="bg-gray-200 p-5" onClick={() => setEasyHard("hard")}>Add Question</button>
        </div>
    </div>
    </>)
}

function GeneralForm({skillId, callbackFunction, easyHard}) {
    const options = ["multiselect", "numerical"]
    const [editingQuestionType, setEditingQuestionType] = useState("multiselect")

    const correctForm = (tempType) => {
        switch (tempType) {
            // case "mcq":
            //     return <AddMcqForm skillId={skillId} callbackFunction={callbackFunction} easyHard={easyHard} />
            case "multiselect":
                return <AddMultiselectForm skillId={skillId} callbackFunction={callbackFunction} easyHard={easyHard} />
            case "numerical":
                return <AddNumericalForm skillId={skillId} callbackFunction={callbackFunction} easyHard={easyHard} />
            default:
                return <></>
        }
    }

    return <div className="absolute m-auto left-0 right-0 flex flex-col max-w-screen-lg mx-auto shadow-sm mt-20 p-5 bg-white rounded-md">
        <h1 className="self-center text-2xl bold py-6">New card - {easyHard}</h1>

        <select className="self-center mb-5 w-[20%] border-2 border-gray-200 rounded-md" onChange={(e) => setEditingQuestionType(e.target.value)}>
            {
                options.map((option, index) => {
                    return <option key={index}>{option}</option>
                })
            }
        </select>
        
        {correctForm(editingQuestionType)}
    </div>

}