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
            const { message } = content
            setMessages(oldMsg => [...oldMsg, message])
        })
    }, [])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit("chat", {newMessage, token});
        
        setNewMessage("");
    }

    const logout = () => {
        if(localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
        if(localStorage.getItem("user")) {
            localStorage.removeItem("user");
        }

        setIsLogged(false)
    }

  return (
    <div className="App">
        <div className="header">
            <p>Logged as <b>{user}</b></p>
            <p onClick={logout} className="logout">Logout</p>
        </div>
        <ul className="chats">
            {messages.map((msg, index) => (
                <li key={index} style={{backgroundColor: msg.creator === user ? "rgb(85, 85, 243)" : "grey"}}>
                    <p>Content: <b>{msg.content}</b></p>
                    <p>From: <b>{msg.creator}</b></p>
                    <p>Date: <b>{msg.createdAt}</b></p>
                </li>
            ))}
        </ul>
        <form onSubmit={sendMessage} className="chat-bar">
            <input value={newMessage} placeholder="Your message..." onChange={(event) => setNewMessage(event.target.value)} type="text"/>
            <input type="submit" value="Send" onClick={sendMessage} />
        </form>
        {isLogged ? null: <Navigate to="/login" /> }
    </div>
  );
}

export default Chat;