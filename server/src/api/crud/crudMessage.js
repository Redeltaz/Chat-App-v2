import CRUDBase from "./crudBase.js";
import db from "../../database/database.js";

class CRUDMessage extends CRUDBase {

    constructor(label) {
        super(label);
    }

    async createMessageUserRelation(message, user) {
        const session = db.driver.session();

        try {
            const { records } = await session.run(`MATCH (a:${this.label}), (b:User) WHERE a.id = ${message.id} AND b.id = ${user.id} CREATE (a)-[r:WRITEN_BY]->(b) RETURN a, b`);
            session.close();
            
            // parsing what neo4j return
            const messageDb = records[0].get("a").properties;
            messageDb.id = messageDb.id.low;
            
            const userDb = records[0].get("b").properties;
            userDb.id = userDb.id.low;

            return {
                message,
                user,
            };
        }
        catch(error) {
            console.log(error);
            return error;
        }
    }

    async getMessageWithRelation() {
        const session = db.driver.session();

        try {
            const { records } = await session.run(`MATCH (a:${this.label})-[r:WRITEN_BY]-(b) return a, b`);
            session.close();
            
            // parsing what neo4j return*
            const messagesDb = records.map((record) => {
                const message = record.get("a").properties;
                message.id = message.id.low;
                const user = record.get("b").properties;
                message.creator = user.pseudo;

                return message;
            });

            return messagesDb;
        }
        catch(error) {
            console.log(error);
            return error;
        }
    }
}

const crudMessage = new CRUDMessage("Message");
export default crudMessage;