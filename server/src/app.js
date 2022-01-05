import http from "http";
import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";

import usersRoute from "./api/routes/usersRoute.js";
import messagesRoute from "./api/routes/messageRoute.js";
import authRoute from "./api/routes/authRoute.js";

import { verifyToken } from "./api/middleware/token.js";

dotenv.config();

const PORT = parseInt(process.env.API_PORT) || 3000;

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(verifyToken);

app.use("/api/users", usersRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/auth", authRoute);

server.listen(PORT, () => {
    console.log(`app runing on http://127.0.0.1:${PORT}.`);
});