import { useState } from 'react';
import App from '../App.tsx';

export default function Login() {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    function login () {
        if (!loggedIn) {
            setLoggedIn(true);
        };
    }

    return (
        <>
            {loggedIn ? (
                <App/>
            ) : (
                <div>
                    <h1>Inviter</h1>
                    <button onClick={login}>Enter</button>
                </div>
            )}
        </>
    )
}
