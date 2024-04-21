import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"

import { UserContext, ApiUrlContext } from "../../Context"

export default function Codify() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)
    const { questionId } = useParams();

    const [questionText, setQuestionText] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        async function getData() {
            try {
                let response = await axios.post(apiUrl + "learn/get-question-codify", { token: user.token, questionId: questionId })
                const question = response.data
                const correctOptions = JSON.stringify(question.options.filter((q, index) => question.correct.includes(index)))
                // const correctOptions = ["oh no"]
                // const incorrectOptions = ["yay"]
                const incorrectOptions = JSON.stringify(question.options.filter((q, index) => !question.correct.includes(index)))


                setQuestionText(`function q${question["_id"]}() {
    const question = \`${question.question}\`
    let correctOptions = ${correctOptions}
    let incorrectOptions = ${incorrectOptions}
    let [returnOptions, returnCorrect] = generateMultiselect(correctOptions, incorrectOptions)
    return {
        type: "multiselect",
        question: question,
        options: returnOptions,
        correct: returnCorrect
    }
}`)
                
            } catch (err) {
                console.error(err)
                setErrorMessage(err.message || err)
            }
        }
        getData()
    }, [apiUrl, user.token, questionId])


    return (<div className="pt-20">

    {questionText}

    {errorMessage}
    </div>)
}