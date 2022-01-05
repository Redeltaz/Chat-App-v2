import express from "express";
import crudMessage from "../crud/crudMessage.js";

const messagesRoute = express.Router();

messagesRoute.get("/", async (req, res) => {
    try {
        const messages = await crudMessage.getMulti();

        res.send(messages);
    }
    catch (error) {
        console.log(error);
        res.send("There was an error while retrieving all messages");
    }
});

messagesRoute.post("/", async (req, res) => {
    try {
        const { content } = req.body;

        const message = await crudMessage.post(content);

        res.send(message);
    }
    catch (error) {
        console.log(error);
        res.send("There was an error while retrieving all messages");
    }
});

export default messagesRoute;