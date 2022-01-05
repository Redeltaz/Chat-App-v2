import express from "express";
import crudMessage from "../crud/crudMessage.js";

const messagesRoute = express.Router();

messagesRoute.get("/", async (req, res) => {
    try {
        const messages = await crudMessage.getMessageWithRelation();

        res.send(messages);
    }
    catch (error) {
        console.log(error);
        res.send("There was an error while retrieving all messages");
    }
});

messagesRoute.post("/", async (req, res) => {
    try {
        // property decodedToken added in the middleware
        const user = req.decodedToken;
        const { content } = req.body;
        
        const message = await crudMessage.post({content});
        const relation = await crudMessage.createMessageUserRelation(message, user);

        return res.status(200).send(relation);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send("There was an error while retrieving all messages");
    }
});

export default messagesRoute;