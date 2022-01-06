import crudMessage from "../api/crud/crudMessage.js";
import {
    verifyToken
} from "../utils/token.js";

const socketEvet = (socket) => {
    console.log("New user on the room");

    socket.on("disconnect", () => console.log("An user has disconnect"));

    socket.on("chat", async (content) => {
        const { newMessage, token } = content;
        const user = verifyToken(token);

        if (!user) {
            console.log("token is not valid or doesn't exist");
            return false;
        }

        const message = await crudMessage.post({content: newMessage});
        const relation = await crudMessage.createMessageUserRelation(message, user);
        relation.message.creator = relation.user.pseudo;
        delete relation.user;

        console.log("New message sended")
        socket.broadcast.emit("newMessage", relation);
        socket.emit("newMessage", relation);
    });
}

export default socketEvet;