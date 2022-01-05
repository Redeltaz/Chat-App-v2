import {
    decodeJWT
} from "../../utils/token.js";

export const verifyToken = (req, res, next) => {
    if(req.path === "/api/auth/login" || req.path === "/api/auth/register") return next();
    const token = req.headers?.authorization;

    if(!token) {
        return res.status(403).send("There is no token");
    }

    const decodedToken = decodeJWT(token);
    const { id, pseudo, email } = decodedToken;

    if(!id || !pseudo || !email) {
        return res.status(403).send("Your token seems wrong");
    }

    // put user into request to get it on routes
    req.decodedToken = decodedToken;

    return next();
};