import { useState } from 'react';
import App from '../App.tsx';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Landing() {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);
    const [validEmail, setValidEmail] = useState<boolean>(false);

    const URL = import.meta.env.VITE_API_URL;

    async function loginHandler (userName: string) {
        const response = await fetch(`${URL}/users`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_email: userName
            })
        });
        return response.json()
    }

    async function login() {
        validateEmail(userName);
        if (validEmail) {
            const result = await loginHandler(userName);
            if(result.id) {
                setLoggedIn(true);
                setUserId(result.id);
            }
        }
    }

    function returnToStart() {
        setLoggedIn(false);
        setValidEmail(false);
    }

    function validateEmail(userName: string) {
        if (userName.includes("@")) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
            return toast.warn(`Please enter a valid email address`); 
        }
    }

    return (
        <>
            {loggedIn ? (
                <App userName={userName} userId={userId} returnToStart={returnToStart}/>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <h1 className="text-2xl font-bold text-gray-700">Inviter</h1>
                    <div className="block text-sm font-medium text-gray-600">Enter your email address to get started:</div>
                    <br/>
                    <input
                        className="border border-gray-300 rounded-lg p-2 w-1/2"
                        placeholder="Email address"
                        onChange={e => setUserName(e.target.value)}
                    />
                    <br/>
                    <button
                        className="w-1/3 bg-red-400 text-white rounded-lg py-2 mt-4 hover:bg-red-500 transition duration-200"
                        onClick={login}
                        >Next
                    </button>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                theme="light"
            />
        </>
    )
}
