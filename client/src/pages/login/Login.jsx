import React, { useState } from "react";
import './login.css';
import {
    Link,
    Navigate,
} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLogged, setIsLogged] = useState(false);

    const login = async (event) => {
        event.preventDefault();

        if(!email.trim() || !password.trim()){
            alert("Some field are empty");
            return;
        }

        const response = await fetch(API_URL + "/api/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json();

        if (response.status === 200) {
            alert(`Welcome ${data.user.pseudo}, you can now chat`);
            localStorage.setItem("token", JSON.stringify(data.accessToken));
            localStorage.setItem("user", JSON.stringify(data.user));

            setIsLogged(true);
        } else {
            alert(data);
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={login}>
                <input required placeholder="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <input required placeholder="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <input type="submit" value="Login" />
                <p>You don't have an account ? <Link to="/register">Register</Link></p>
            </form>
            {isLogged ? <Navigate to="/chat" /> : null}
        </div>
    );
}

export default Login;