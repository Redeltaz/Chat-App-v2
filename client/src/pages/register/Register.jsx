import React, { useState } from "react";
import './register.css';
import {
    Link,
    Navigate,
} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isRegistered, setIsRegistered] = useState(false);

    const register = async (event) => {
        event.preventDefault();

        if(!pseudo.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()){
            alert("Some field are empty");
            return;
        }

        if(password !== confirmPassword) {
            alert("Your passwords don't match")
            return;
        }

        const response = await fetch(API_URL + "/api/auth/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pseudo,
                email,
                password
            })
        })
        const data = await response.json();

        if (response.status === 200) {
            alert("You are successfuly registered, you can now login");
            setIsRegistered(true);
        } else {
            alert(data);
        }

        setEmail("");
        setPseudo("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="register">
            <form onSubmit={register}>
                <input required type="text" value={pseudo} onChange={(event) => setPseudo(event.target.value)} />
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <input required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                <input type="submit" value="Register" />
                <Link to="/login">Login</Link>
            </form>
            {isRegistered ? <Navigate to="/login" /> : null}
        </div>
    );
}

export default Register;