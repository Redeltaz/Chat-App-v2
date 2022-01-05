import React, { useState, useEffect } from "react";
import './chat.css';
import io from "socket.io-client";
import {
    Navigate,
} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [isLogged, setIsLogged] = useState(true);

    useEffect(() => {
        let tokenStorage;
        let pseudo;

        if(localStorage.getItem("token")) {
            tokenStorage = JSON.parse(localStorage.getItem("token"));
        }
        if(localStorage.getItem("user")) {
            pseudo = JSON.parse(localStorage.getItem("user")).pseudo;
        }

        if(!tokenStorage || !pseudo) setIsLogged(false)
        
        setToken(tokenStorage);
        setUser(pseudo);

        (async () => {
            const data = await fetch(API_URL + "/api/messages/", {
                method: "GET",
                headers: {
                    "Authorization": tokenStorage
                }
            });
            const messages = await data.json();

            setMessages(messages);
        })()
    }, []);

    useEffect(() => {
        socket.on("newMessage", (content) => {
            console.log("new message")
            const { message } = content
            setMessages(oldMsg => [...oldMsg, message])
        })
    }, [])

    const sendMessage = () => {
        socket.emit("chat", {newMessage, token});

        setNewMessage("");
    }

  return (
    <div className="App">
        <div className="header">
            <p>Logged as <b>{user}</b></p>
        </div>
        <ul>
            {messages.map((msg, index) => (
                <li key={index}>
                    <p>{msg.content}</p>
                    <p>{msg.creator}</p>
                    <p>{msg.createdAt}</p>
                </li>
            ))}
        </ul>
        <input value={newMessage} onChange={(event) => setNewMessage(event.target.value)} type="text"/>
        <button onClick={sendMessage}>Send</button>
        {isLogged ? null: <Navigate to="/login" /> }
    </div>
  );
}

export default Chat;