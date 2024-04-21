import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiUrlContext, UserContext } from "../../Context"
import MultiselectQuestion from "./questions/MultiselectQuestion";
import SingleselectQuestion from "./questions/SingleselectQuestion";
import NumericalQuestion from "./questions/NumericalQuestion";
import axios from "axios"

export default function Learn() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)
    const location = useLocation()
    const navigate = useNavigate()

    const [questionIds, setQuestionIds] = useState([])
    const [question, setQuestion] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [streak, setStreak] = useState(0)
    const [pastQuestions, setPastQuestions] = useState([])

    useEffect(() => {
        if (currentQuestionIndex >= questionIds.length) {
            return
        }
        if (questionIds.length === 0) {
            return
        }
        async function getData() {
            let response = await axios.post(apiUrl + "learn/get-question", {
                token: user.token,
                questionId: questionIds[currentQuestionIndex],
            })
            if (response.data.type === "next") {
                setCurrentQuestionIndex(currentQuestionIndex+1)
            }
            setQuestion(response.data)

            response = await axios.post(apiUrl + "users/get-past-questions", { token: user.token })
            setPastQuestions(response.data)
        }
        getData()
    }, [apiUrl, currentQuestionIndex, questionIds, user.token, streak])


    useEffect(() => {
        if (location.state === null || location.state.questionIds === null || location.state.questionIds.length === 0) {
            navigate("/")
            return
        }
        setQuestionIds(location.state.questionIds)
    }, [location.state.questionIds, location.state, navigate])


    // Helper functions
    const callbackFunction = async (response) => {
        const myIndex = pastQuestions.findIndex(idk => idk.question.toString() === questionIds[currentQuestionIndex])
        if (response === "correct") {
            if (myIndex === -1) {
                pastQuestions.push({
                    question: questionIds[currentQuestionIndex],
                    colour: "green",
                    lastAttempt: "now",
                    nextScheduled: "later"
                })
            } else {
                pastQuestions[myIndex] = { ...pastQuestions[myIndex], colour: "green", lastAttempt: "now!" }
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
        if (response === "incorrect") {
            if (myIndex === -1) {
                pastQuestions.push({
                    question: questionIds[currentQuestionIndex],
                    colour: "orange",
                    lastAttempt: "now",
                    nextScheduled: "later"
                })
            } else {
                pastQuestions[myIndex] = { ...pastQuestions[myIndex], colour: "orange", lastAttempt: "now!" }
            }
            setStreak(streak + 1)
        }
        if (response === "again") {
            setStreak(streak + 1)
        }
        // update thingo
        console.log(pastQuestions)
        response = await axios.post(apiUrl + "users/set-past-questions", { token: user.token, pastQuestions: (pastQuestions) })

    }

    // HTML components
    const correctForm = (question) => {
        if (question === undefined) {
            return (<>No question found</>)
        }
        switch (question.type) {
            case "multiselect":
                if (question.correct.length === 1) {
                    return <SingleselectQuestion question={question} callbackFunction={callbackFunction} />
                }
                return <MultiselectQuestion question={question} callbackFunction={callbackFunction} />
            case "numerical":
                return <NumericalQuestion skillId={question} callbackFunction={callbackFunction} />
            default:
                return <></>
        }
    }

    if (currentQuestionIndex >= questionIds.length) {
    return <div className="pt-20 w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl">You're all done!</h1>
        <div className="flex flex-row gap-5">
            <button className="rounded-md bg-white border-gray-200 border-[2px] shadow-sm w-40 py-3 self-center mt-10" onClick={() => navigate("/choose")}>Keep learning</button>
            <button className="rounded-md bg-white border-gray-200 border-[2px] shadow-sm w-32 py-3 self-center mt-10" onClick={() => navigate("/")}>Go home</button>
        </div>
    </div>
    }


    return(<div className="mt-52">
        <div className="fixed right-16 top-28 text-2xl">
            Streak: {currentQuestionIndex}
        </div>
        {correctForm(question)}
    </div>)
}