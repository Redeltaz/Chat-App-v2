import React from "react";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Chat from "./pages/chat/Chat";

const App = () => {

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;