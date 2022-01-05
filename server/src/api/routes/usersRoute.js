import express from "express";
import crudUser from "../crud/crudUser.js";

const usersRoute = express.Router();

usersRoute.get("/", async (req, res) => {
    try {
        const users = await crudUser.getMulti();

        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.json("There was an error while retrieving all users");
    }
});

usersRoute.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await crudUser.get(id);
        
        if (user) { 
            res.json(user);
        }else {
            res.status(404).json("There is no user with this id");
        }
    }
    catch (error) {
        console.log(error);
        res.json("There was an error while retrieving this user");
    }
});

export default usersRoute;