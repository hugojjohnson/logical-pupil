import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ApiUrlContext, UserContext } from "../../Context";


export default function AdminAuth() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)

    const navigate = useNavigate()
    
    useEffect(() => {
        if (user.username !== "borishot") {
            navigate("/")
        }
    }, [navigate, user])

    return(<>
    <Outlet />
    </>)
}