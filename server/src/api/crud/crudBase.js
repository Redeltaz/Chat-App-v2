import db from "../../database/database.js";
import { objectToString } from "../../utils/parsing.js";

/**
 * Abstract parent class, only use for childrens
 */
class CRUDBase {
    label;
    session;

    constructor(label) {
        this.label = label;
    }

    async get(id) {
        const session = db.driver.session();

        try {
            const { records } = await session.run(`MATCH (n:${this.label}) WHERE n.id = ${id} RETURN n`);
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

    async getMulti() {
        const session = db.driver.session();

        try {
            const { records } = await session.run(`MATCH (n:${this.label}) RETURN n`);
            session.close();

            if (!records.length) return false;

            // parsing what neo4j return
            const result = records.map((record) => {
                const properties = record.get("n").properties;
                properties.id = properties.id.low;
                return properties;
            });

            return result;
        }
        catch(error) {
            return error;
        }
    }

    async post(params) {
        const session = db.driver.session();

        try {
            const parsedParams = objectToString(params);

            const { records } = await session.run(`CREATE (n:${this.label}) SET n = ${parsedParams}, n.id = id(n) RETURN n`);
            session.close();

            const result = records[0].get("n").properties;
            result.id = result.id.low;

            return result;
        }
        catch(error) {
            return error;
        }
    }

    async delete(id) {
        const session = db.driver.session();
        
        try {
            const { records } = await session.run(`MATCH (n:${this.label}) WHERE n.id = ${id} DETACH DELETE n RETURN n`);
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

export default CRUDBase;