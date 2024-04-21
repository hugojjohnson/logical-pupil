
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { UserContext, ApiUrlContext } from "../../Context"
import axios from "axios"

export default function Topics() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)

    let colors = ["bg-red-200", "bg-orange-200", "bg-yellow-200"]
    const [topics, setTopics] = useState(["none"])
    const [subTopics, setSubTopics] =  useState([])
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        async function getData() {
            try {
                let response = await axios.post(apiUrl + "admin/get-topics", { token: user.token })
                setTopics(response.data)
                response = await axios.post(apiUrl + "admin/get-sub-topics", { token: user.token })
                setSubTopics(response.data)
            } catch (err) {
                setErrorMessage(err.message || err)
            }

        }
        getData()
    }, [apiUrl, user.token])
    
    return(<div className="pt-20 px-20 mx-auto">
        {
            topics.map((topic, index) => {
                return <div key={index} className={`flex flex-col p-3 m-3 bg-slate-50 rounded-md`}>
                    <h1 className="text-lg font-bold">{topic.number}: {topic.name}</h1>
                    <div className="border-b-[1px] border-slate-200 my-3"></div>

                    <div className="grid grid-cols-2 gap-3 w-[60%] grid-flow-dense">
                    {
                        subTopics.filter(subtopic => subtopic.topic.toString() === topic._id.toString()).map(subtopic => {
                            return <div><Link to={"/admin/subtopic/" + subtopic["_id"]} className="text-gray-500 hover:text-black hover:underline hover:cursor-pointer inline">{subtopic.name}</Link></div>
                        })
                    }
                    </div>

                </div>
            })
        }

        <p>{errorMessage}</p>
    </div>)
}