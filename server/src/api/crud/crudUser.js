import CRUDBase from "./crudBase.js";
import db from "../../database/database.js";

class CRUDUser extends CRUDBase {

    constructor(label) {
        super(label);
    }

    async getByEmail(email) {
        const session = db.driver.session();

        try {
            const { records } = await session.run(`MATCH (n:${this.label}) WHERE n.email = '${email}' RETURN n`);
            session.close();
            
            if (!records.length) return false;
            
            // parsing what neo4j return
            const result = records[0].get("n").properties;
            result.id = result.id.low;

            return result;
        }
        catch(error) {
            return error;
        }
    }
}

const crudUser = new CRUDUser("User");
export default crudUser;