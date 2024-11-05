import { useState } from 'react';
import App from '../App.tsx';

export default function Landing() {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);

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
        const result = await loginHandler(userName);
        if(result.id) {
            setLoggedIn(true);
            setUserId(result.id);
        } else {
            console.log("error");
        }
    }

    return (
        <>
            {loggedIn ? (
                <App userName={userName} userId={userId}/>
            ) : (
                <div>
                    <h1>Inviter</h1>
                    <div>Enter your email address to get started:</div>
                    <br/>
                    <input
                        placeholder="Email address"
                        onChange={e => setUserName(e.target.value)}
                    />
                    <br/>
                    <button onClick={login}>Next</button>
                </div>
            )}
        </>
    )
}