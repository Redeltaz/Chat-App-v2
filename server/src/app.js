import http from "http";
import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";

import usersRoute from "./api/routes/usersRoute.js";
import messagesRoute from "./api/routes/messageRoute.js";
import authRoute from "./api/routes/authRoute.js";

import socketEvent from "./socket/message.js";

dotenv.config();

const PORT = parseInt(process.env.API_PORT) || 3000;

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", socketEvent);

app.use(express.json());
//To allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers','Authorization');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use("/api/users", usersRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/auth", authRoute);

server.listen(PORT, () => {
    console.log(`app runing on http://127.0.0.1:${PORT}.`);
});