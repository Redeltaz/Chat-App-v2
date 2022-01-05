import express from "express";
import crudMessage from "../crud/crudMessage.js";
import {
    verifyToken
} from "../../utils/token.js";

const messagesRoute = express.Router();

messagesRoute.get("/", async (req, res) => {
    const decodedToken = verifyToken(req.headers.authorization);
    if (!decodedToken) {
        return res.status(400).json("A valid token is missing")
    }

    try {
        const messages = await crudMessage.getMessageWithRelation();

        res.json(messages);
    }
    catch (error) {
        console.log(error);
        res.json("There was an error while retrieving all messages");
    }
});

messagesRoute.post("/", async (req, res) => {
    const user = verifyToken(req.headers.authorization);
    if (!user) {
        return res.status(400).json("A valid token is missing")
    }

    try {
        const { content } = req.body;
        
        const message = await crudMessage.post({content});
        const relation = await crudMessage.createMessageUserRelation(message, user);

        return res.status(200).json(relation);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json("There was an error while retrieving all messages");
    }
});

export default messagesRoute;