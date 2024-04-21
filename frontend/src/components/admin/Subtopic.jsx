import React, { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import axios from "axios"

import { UserContext, ApiUrlContext } from "../../Context"


export default function Subtopic() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)
    const { subtopicId } = useParams();

    const [subtopicInfo, setSubtopicInfo] = useState({})
    const [skills, setSkills] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [addingSkill, setAddingSkill] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                let response = await axios.post(apiUrl + "admin/get-skills", { token: user.token, subtopicId: subtopicId })
                setSkills(response.data)
                response = await axios.post(apiUrl + "admin/get-subtopic-info", { token: user.token, subtopicId: subtopicId })
                setSubtopicInfo(response.data)
            } catch (err) {
                setErrorMessage(err.message || err)
            }

        }
        getData()
    }, [apiUrl, user.token, subtopicId, addingSkill])

    return(<>
    {
        addingSkill && (<>
            <div className="absolute w-full h-full bg-gray-500 opacity-60" onClick={() => setAddingSkill(false)}></div>
            <AddSkillForm subtopicId={subtopicId} callbackFunction={() => setAddingSkill(false)} />
        </>)
    }
    
    <div className="mx-auto max-w-screen-2xl">
    <h1 className="w-full text-center mx-auto mt-5 text-2xl bold">{subtopicInfo.name}</h1>
    <button className="bg-gray-100 p-2 rounded-md" onClick={() => setAddingSkill(true)}>Add skill</button>
    <div className="flex flex-col gap-2 m-5 p-5 bg-red-100 border-2 border-red-500 rounded-md">
    <h1 className="text-red-600 underline text-xl font-bold mb-2">Units</h1>
    {
        skills.filter(mySkill => mySkill.type === "unit").map((skill, index) => {
            return <Link to={"/admin/skill/" + skill["_id"]} className="text-gray-500 hover:text-black" key={index}>{skill.name + (skill.easy.length === 0 ? "❗" : "")}</Link>
        })
    }
    </div>

    <div className="flex flex-col gap-2 m-5 p-5 bg-orange-100 border-2 border-orange-500 rounded-md">
        <h1 className="text-orange-600 underline text-xl font-bold mb-2">Formula</h1>
        {
            skills.filter(mySkill => mySkill.type === "formula").map((skill, index) => {
                return <Link to={"/admin/skill/" + skill["_id"]} className="text-gray-500 hover:text-black" key={index}>{skill.name + (skill.easy.length === 0 ? "❗" : "")}</Link>
            })
        }
    </div>

    <div className="flex flex-col gap-2 m-5 p-5 bg-yellow-100 border-2 border-yellow-500 rounded-md">
        <h1 className="text-yellow-600 underline text-xl font-bold mb-2">Word problems</h1>
        {
            skills.filter(mySkill => mySkill.type === "word problem").map((skill, index) => {
                return <Link to={"/admin/skill/" + skill["_id"]} className="text-gray-500 hover:text-black" key={index}>{skill.name + (skill.easy.length === 0 ? "❗" : "")}</Link>
            })
        }
    </div>

    <div className="flex flex-col gap-2 m-5 p-5 bg-green-100 border-2 border-green-500 rounded-md">
        <h1 className="text-green-600 underline text-xl font-bold mb-2">Understanding</h1>
        {
            skills.filter(mySkill => mySkill.type === "understanding").map((skill, index) => {
                return <Link to={"/admin/skill/" + skill["_id"]} className="text-gray-500 hover:text-black" key={index}>{skill.name + (skill.easy.length === 0 ? "❗" : "")}</Link>
            })
        }
    </div>

    <div className="flex flex-col gap-2 m-5 p-5 bg-blue-100 border-2 border-blue-500 rounded-md">
        <h1 className="text-blue-600 underline text-xl font-bold mb-2">Graphs</h1>
        {
            skills.filter(mySkill => mySkill.type === "graph").map((skill, index) => {
                return <Link to={"/admin/skill/" + skill["_id"]} className="text-gray-500 hover:text-black" key={index}>{skill.name + (skill.easy.length === 0 ? "❗" : "")}</Link>
            })
        }
    </div>
    </div>
    </>)
}

function AddSkillForm({ subtopicId, callbackFunction }) {
    const types = ["unit", "formula", "word problem", "understanding", "graph"]

    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)


    const [type, setType] = useState(types[0])
    const [name, setName] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    return (<div className="absolute m-auto left-0 right-0 flex flex-col max-w-screen-lg mx-auto shadow-sm mt-20 p-5 bg-white rounded-md">
        <h1 className="bold text-2xl underline pb-10 self-center">Add a Skill</h1>

        <h3 className="font-bold">Type</h3>
        <select className="mb-5 w-[20%] border-2 border-gray-200 rounded-md" onChange={(e) => setType(e.target.value)}>
        {
            types.map((myType, index) => {
                return <option key={index}>{myType}</option>
            })
        }
        </select>

        <h3 className="font-bold">Name</h3>
        <input className="w-[30%] mb-5 border-2 border-gray-200 rounded-md" value={name} onChange={(e) => setName(e.target.value)} />

        <button className="py-5" onClick={submitSkill}>Submit</button>

        <p>{errorMessage}</p>

    </div>)

    async function submitSkill() {

        try {
            const response = await axios.post(apiUrl + "admin/add-skill", {
                token: user.token,
                subtopic: subtopicId,
                type: type,
                name: name
            })
            callbackFunction()
        } catch (err) {
            console.error(err)
            setErrorMessage(err.message)
        }
    }
}