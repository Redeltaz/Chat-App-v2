import express from "express";
import crudUser from "../crud/crudUser.js";
import {
    hashPassword,
    isSamePassword,
} from "../../utils/password.js";
import {
    generateJWT
} from "../../utils/token.js";

const authRoute = express.Router();

authRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let userDb = await crudUser.getByEmail(email);

        if (!userDb) return res.status(404).json("There is no user with this email adress");

        const isGoodPassword = await isSamePassword(password, userDb.password);
            
        if(!isGoodPassword) return res.status(403).json("Wrong password");
        
        delete userDb.password;

        const token = generateJWT(userDb);
        
        return res.status(200).json({
            accessToken: token,
            user: userDb,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json("There was an error while retrieving all users");
    }
});

authRoute.post("/register", async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;
        const newUser = {
            pseudo,
            email,
            password,
        };

        let userDb = await crudUser.getByEmail(newUser.email);

        if (userDb) return res.status(409).json("User with this email already exist");
        
        newUser.password = await hashPassword(password);
        userDb = await crudUser.post(newUser);

        return res.status(200).json(userDb);

    }
    catch (error) {
        console.log(error);
        return res.status(400).json("There was an error while retrieving this user");
    }
});

export default authRoute;