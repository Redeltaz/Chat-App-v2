import {
    decodeJWT
} from "../../utils/token.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization;

    if(!token) {
        return res.status(403).send("There is no token");
    }

    const decodedToken = decodeJWT(token);
    console.log(decodedToken);

    next();
};