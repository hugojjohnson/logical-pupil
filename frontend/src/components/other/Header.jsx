import { Outlet, Link, useLocation } from "react-router-dom";
import { UserContext, ApiUrlContext } from "../../Context";
import { useContext, useEffect, useState } from "react";

export default function Header() {
    const [user] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)

    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    // useEffect(() => {
    //     if (user.username === "" || user.token === "") {
    //         setUser(user => ({ ...user, username: "", loggedIn: false, token: "" }));
    //     }
    // }, [user, setUser])

    useEffect(() => {
        window.addEventListener('scroll', pop);

        return () => window.removeEventListener('scroll', pop);

        function pop() {
            if (user.loggedIn) {
                return
            }

            if (window.scrollY > 350) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
    }, [user.loggedIn]);

    // async function setPfp() {
        
    // }



    return (<>
        <div className={`${(!user.loggedIn && location.pathname === "/") ? "hidden" : ""} transition-opacity ease-in-out flex flex-row justify-between items-center p-3 shadow-md bg-white w-full absolute z-10`}>
            <Link to="/"><img src="/misc/logo.png" alt="logo" className="w-12 h-12" /></Link>
            {
                user.loggedIn ? (
                    <Link to="/profile" className="flex flex-row items-center gap-3">
                        <p>{user.username}</p>
                        <img className="h-14 w-14 p-2 rounded-full" src={user.pfp ? `/profiles/${user.pfp}.png` : "/profiles/default.png"} alt="profile pic" />
                    </Link>
                ) : (<>
                        <div className="flex flex-row gap-3">
                        <Link to="/sign-in" className="">
                                <p className="p-3 bg-black text-white rounded-md shadow-inner">Sign in</p>
                        </Link>
                        <Link to="/sign-up">
                                <p className="p-3 bg-slate-100 shadow-sm rounded-md">Sign up</p>
                        </Link>
                        </div>
                </>)
            }
        </div>
        <div className={`absolute w-full bg-slate-50 min-h-screen`}>
            <Outlet />
        </div>
    </>);
}