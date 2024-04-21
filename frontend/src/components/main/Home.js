import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiUrlContext, UserContext } from "../../Context";
import axios from "axios";
import { MathJax } from "better-react-mathjax"


// var Latex = require('react-latex');


export default function Home() {
    const apiUrl = useContext(ApiUrlContext)
    const [user] = useContext(UserContext)

    const [tree, setTree] = useState([])
    const [pastQuestions, setPastQuestions] = useState([])


    useEffect(() => {
        async function getData() {
            if (user.token === undefined || user.token === "") {
                return
            }
            try {
                let response = await axios.post(apiUrl + "learn/get-tree", { token: user.token })
                setTree(response.data)

                response = await axios.post(apiUrl + "users/get-past-questions", { token: user.token })
                setPastQuestions(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        getData()
    }, [apiUrl, user.token])

    if (user.loggedIn === false) {
        return(<div className="w-full min-h-screen mb-40">
            <div className="mx-auto max-w-screen-3xl px-32 h-full flex flex-col gap-5 items-center text-center">
                <h1 className="text-black text-6xl mt-[15%]">Logical Pupil</h1>
                <h3 className=" text-3xl my-5">Learn Physics through practice.</h3>

                <div className="flex flex-row gap-5">
                    <Link to="/sign-in" className="p-3 bg-black text-white rounded-md shadow-inner">Sign In</Link>
                    <Link to="/sign-up" className="p-3 bg-slate-100 shadow-sm rounded-md">Sign Up</Link>
                </div>


                <div className="flex flex-row gap-16 my-32">
                    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3">
                        <img className="w-20" src={"/misc/marking.png"} alt="gears" />
                        <h4>Generated questions</h4>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3">
                        <img className="w-20" src={"/misc/lightbulb.png"} alt="gears" />
                        <h4>Worked solutions</h4>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3">
                        <img className="w-20" src={"/misc/mastery.png"} alt="gears" />
                        <h4>Master key concepts</h4>
                    </div>
                </div>

                {/* Text boxes */}
                <div className="self-start text-left flex flex-row gap-5 items-center mb-10">
                    <img className="w-24 h-fit" src={"/misc/marking.png"} alt="robot" />
                    <div className="">
                        <h2 className="text-2xl mb-4">Do the same question a thousand different ways</h2>
                        <p className="text-lg w-[80%]">Every time, the answer is different - letting you practice the same concepts until you get them right every time.</p>
                    </div>
                </div>

                <div className="self-end text-right flex flex-row gap-5 items-center mb-10">
                    <div className="">
                        <h2 className="text-2xl mb-4">Worked solutions</h2>
                        <p className="text-lg w-[600px]">Don't waste time finding out how you should answer the question - get the answers in the same place.</p>
                    </div>
                    <img className="w-24 h-fit" src={"/misc/lightbulb.png"} alt="lightbulb" />
                </div>

                <div className="self-start text-left flex flex-row gap-5 items-center mb-10">
                    <img className="w-24 h-fit" src={"/misc/mastery.png"} alt="ninja" />
                    <div className="">
                        <h2 className="text-2xl mb-4">Master key concepts</h2>
                        <p className="text-lg w-[80%]">Go through each formula, concept and syllabus point in order, or in your own direction.</p>
                    </div>
                </div>

                <div className="flex flex-row gap-5">
                    <Link to="/sign-in" className="p-3 bg-black text-white rounded-md shadow-inner">Sign In</Link>
                    <Link to="/sign-up" className="p-3 bg-slate-100 shadow-sm rounded-md">Sign Up</Link>
                </div>
            </div>
        </div>)
    }

    // Logged in functions

    function getNextUndoneQuestion() {
        for (const myTopic of tree) {
            for (const mySubtopic of myTopic.subtopics) {
                for (const mySkill of mySubtopic.skills) {
                    for (const myQuestion of mySkill.questions) {
                        const matchingPastQuestions = pastQuestions.filter(idk => {
                            return idk.question.toString() === myQuestion["_id"].toString()
                        })
                        if (matchingPastQuestions.length === 0) {
                            return mySkill.name
                        }
                    }
                }
            }
        }
    }

    return (<div className="mt-28 mx-auto max-w-screen-2xl w-full h-full flex flex-col">
        <h1 className="text-4xl pt-5">Welcome back, {user.username}!</h1>
        {/* <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax> */}
        <br /> <br /> <br />
        {/* <h3 className="self-center text-xl">Continue where you left off</h3>
        <div className="w-full mx-auto flex justify-center mt-6">
            <TextCard />
        </div> */}
        
        <p className="my-6 mt-10 text-3xl">Up next</p>
        <p className="self-center mt-10 text-4xl underline">{ getNextUndoneQuestion() }</p>

        <p className="mt-20 mb-6 text-3xl">Browse topics</p>
       

        {
            tree.map((topic, index) => {
                return <Link to={"/choose/" + topic["_id"]} key={index} className="mt-5 p-0 border-[1.5px] rounded-md border-gray-200 h-36 mx-52 flex justify-center">
                    <div className="relative group flex items-center justify-center h-full w-full rounded-md">
                        <p className="absolute z-10 bg-none text-4xl ml-5 text-black group-hover:text-white transition-all duration-[700ms]">Unit {index+1}: {index < tree.length ? tree[index].name : "Something else"}</p>
                        <div className="absolute z-9 w-full h-full bg-none group-hover:bg-black group-hover:bg-opacity-80 transition-all duration-[700ms]" />
                        <img className="absolute w-full h-full object-cover object-top group-hover:object-center transition-all duration-[700ms] opacity-0 group-hover:opacity-80" src={`/covers/${index+1}.webp`} alt="hi" />
                    </div>
                </Link>
            })
        }
        </div>)
}