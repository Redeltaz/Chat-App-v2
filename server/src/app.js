import express from "express";
import dotenv from "dotenv";

import usersRoute from "./api/routes/usersRoute.js";
import messagesRoute from "./api/routes/messageRoute.js";
import authRoute from "./api/routes/authRoute.js";

import { verifyToken } from "./api/middleware/token.js";

dotenv.config();

const PORT = parseInt(process.env.API_PORT) || 3000;

const app = express();

app.use(express.json());
app.use(verifyToken);

app.use("/api/users", usersRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`app runing on http://127.0.0.1:${PORT}.`);
});