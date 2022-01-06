import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = String(process.env.DB_HOST);
const DB_USERNAME = String(process.env.DB_USERNAME);
const DB_PASSWORD = String(process.env.DB_PASSWORD);

class Database {
    driver;
    _authToken;

    _dbHost;
    _dbUsername;
    _dbPassword;

    constructor(host, username, password) {
        this._dbHost = host;
        this._dbUsername = username;
        this._dbPassword = password;

        this._authToken = neo4j.auth.basic(this._dbUsername, this._dbPassword);

        this._openConnection();
    }

    _openConnection() {
        console.log(DB_HOST)
        console.log(DB_USERNAME)
        console.log(DB_PASSWORD)
        this.driver = neo4j.driver(this._dbHost, this._authToken);
    }
}

const db = new Database(
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD
);

export default db;