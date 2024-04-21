import { UserContext, ApiUrlContext } from "../../Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";


export default function Signin() {
    const [user, setUser] = useContext(UserContext)
    const apiUrl = useContext(ApiUrlContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")

    async function signIn() {
        if (email === "" || password === "") {
            setErrorText("Please fill in email and password.");
            return;
        }
        if (!email.includes("@")) {
            setErrorText("Email is invalid.")
            return;
        }

        try {
            const salt = await saltify(email + password)
            const response = await axios.post(apiUrl + "users/sign-in/email", {
                email: email,
                password: salt
            })
            if (response.status !== 200) {
                setErrorText(response.data)
                return;
            }
            setUser(user => ({ ...user, username: response.data.username, loggedIn: true, token: response.data.token, pfp: response.data.pfp }));
            navigate('/');
            return;


        } catch (err) {
            setErrorText(err.message)
        }
    }

    async function signInWithGoogle(response) {
        try {
            const axiosResponse = await axios.post(apiUrl + "users/sign-in/google", {
                google_jwt: response.credential
            })
            if (axiosResponse.status !== 200) {
                setErrorText(axiosResponse.data)
                return;
            }
            setUser(user => ({ ...user, username: axiosResponse.data.username, loggedIn: true, token: axiosResponse.data.token, pfp: axiosResponse.data.pfp }));

            navigate('/');
            return;


        } catch (err) {
            setErrorText(err.message)
        }
    }


    // encrypt the password before sending it
    // from https://stackoverflow.com/questions/18338890
    async function saltify(message) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    }

    useEffect(() => {
        if (user.loggedIn) {
            return navigate("/");
        }
    }, [navigate, user.loggedIn]);

    
    return (<div className="w-full h-screen flex flex-col mt-20">
        <div className="mx-auto max-w-screen-sm w-full flex flex-col gap-2 justify-center pt-10">
            <p>Email</p>
            <input className=" bg-slate-100 rounded-sm shadow-inner p-3 h-full w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />

            <p>Password</p>
            <input className=" bg-slate-100 rounded-sm shadow-inner p-3 h-full w-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />


            <button className="rounded-md border-gray-200 border-[2px] shadow-sm w-[60%] py-3 self-center mt-6" onClick={() => signIn()}>Sign In</button>

            <div className="self-center py-3">
                <GoogleLogin onSuccess={signInWithGoogle} onError={err => console.error(err)} text="signin_with" useOneTap size="medium" />
            </div>

            {/* Divider */}

            <Link to="/sign-up" className=" self-center text-blue-900 cursor-pointer">Sign Up</Link>
            <p className=" self-center text-blue-900 cursor-pointer">Forgot password</p>
            <p className=" self-center text-blue-900 cursor-pointer">Home</p>

            <p className="mt-10 self-center">{errorText}</p>
        </div>
    </div>)
}