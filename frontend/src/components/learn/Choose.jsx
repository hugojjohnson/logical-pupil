import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ApiUrlContext, UserContext } from "../../Context"

export default function Choose() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)
    const navigate = useNavigate()

    const [tree, setTree] = useState([])
    const [questions, setQuestions] = useState([]) // it's technically derived, but apparently it needs to be state too.

    const [selectedSkills, setSelectedSkills] = useState([])
    const [pastQuestions, setPastQuestions] = useState([])

    const location = useLocation()
    
    useEffect(() => {
        const slashParams = location.pathname.split("/")
        // The first slash is just "", so that's why it needs to be 3 or more.
        if (slashParams.length > 2) {
            let elem = document.getElementById(slashParams[2])
            if (elem) {
                // elem.scrollIntoView({ behavior: "smooth" })
                window.scrollTo({ top: elem.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 50, left: 0, behavior: "smooth" })
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
    }, [location, tree])

    // useEffect
    useEffect(() => {
        async function getData() {
            // === Get tree ===
            let response = await axios.post(apiUrl + "learn/get-tree", {
                token: user.token
            })
            setTree(response.data)

            // === Calculate questions ===
            let temp = []
            // Get a list of every question
            for (const topic of response.data) {
                for (const subtopic of topic.subtopics) {
                    for (const skill of subtopic.skills) {
                        for (const question of skill.questions) {
                            temp.push(question)
                        }
                    }
                }
            }
            setQuestions(temp)

            response = await axios.post(apiUrl + "users/get-past-questions", { token: user.token })
            setPastQuestions(response.data)
        }
        getData()
    }, [apiUrl, user.token])


    // Helper functions
    const handleSkillClick = (index) => {
        let copy = [...selectedSkills]
        if (copy.includes(index)) {
            copy = copy.filter(entry => entry !== index)
            setSelectedSkills(copy)
        } else {
            copy.push(index)
            setSelectedSkills(copy)
        }
    }

    const skillsToIds = async () => {
        // If the question has a ["skill"]
        const chosenQuestions = questions.filter(idk => selectedSkills.includes(idk["skill"])).map(idk => idk["_id"])

        navigate("/learn", { state: { questionIds: chosenQuestions }})
    }

    // HTML functions
    const topicHTML = (topic, index) => {
        if (topic.length === 0) {
            return <></>
        }
        return <div className="relative mx-auto max-w-screen-lg pt-40">
            <p className="text-black text-4xl" id={topic[0].topic}>Topic {index + 1}</p>
            {
                topic.map((subtopic, subtopicIndex) => {
                    return <div key={subtopicIndex}>{ subtopicHTML(index, subtopic) }</div>
                })
            }
            <p className="fixed text-black text-4xl p-3 rounded-md bottom-[10%] right-[10%] underline hover:text-gray-700 hover:cursor-pointer" onClick={skillsToIds}>Get started</p>
        </div>

    }

    const subtopicHTML = (topicIndex, subtopic) => {
        return <div key={subtopic["_id"]}>
            <h1 className="text-black text-2xl pb-2 pt-8">{topicIndex+1}.{subtopic.number} - {subtopic.name}</h1>
            {
                skillHTML(subtopic.skills)
            }
        </div>
    }

    const skillHTML = (subtopic) => {
        return <>{
            subtopic.map((skill, skillIndex) => {
                let colour = ""
                let green = 0
                let orange = 0
                let black = 0
                // get all questions who have skill as a skill
                const myQuestions = questions.filter(idk => idk.skill.toString() === skill["_id"].toString())
                // for each question, compare it to pastQuestion
                    // if it isn't in pastQuestion, it's black
                    // otherwise, it's orange or green, depending on what value it is.
                for (const i of myQuestions.map(idk => idk["_id"])) {
                    if (skill.name === "SI units") {
                        console.log(i)
                        console.log(pastQuestions)
                    }
                    const qC = pastQuestions.filter(idk => idk.question.toString() === i)
                    if (qC.length === 0) {
                        black += 1
                    } else if (qC[0].colour === "green") {
                        green += 1
                    } else if (qC[0].colour === "orange") {
                        orange += 1
                    } else {
                        console.error("Oops! " + qC[0].colour)
                    }
                }
                if (black === 0 && orange === 0) {
                    colour = "bg-green-100"
                } else if (black === 0) {
                    colour = "bg-orange-100"
                }
                return (<div key={skillIndex} className={`${colour} p-3 rounded-md my-1 text-lg text-black flex flex-row gap-2 justify-between w-96`} onClick={() => handleSkillClick(skill["_id"])}>
                    {/* <MathJax>{mathjaxify(option)}</MathJax> */}
                    <div className="flex flex-row gap-2">
                        <p className="hover:cursor-pointer ml-auto">{skill.name}</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <p className="text-green-700">{green}</p>
                        <p className="text-orange-700">{orange}</p>
                        <p className="text-black">{black}</p>
                        <p className={`${selectedSkills.includes(skill["_id"]) || "opacity-0"} text-black py-0`}>☑️</p>
                    </div>
                </div>)
            })
        }</>
    }

    return <div className={`bg-none`}>
        {
            tree.map((topic, index) => {
                return <div key={index}>{ topicHTML(topic.subtopics, index) }</div>
            })
        }
    </div>
}