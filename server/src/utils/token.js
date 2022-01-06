import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;

/**
 * Generate JWT
 */
export const generateJWT = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        algorithm: JWT_ALGORITHM,
    });
    
    return token;
};

/**
 * Decode JWT
 */
export const decodeJWT = (token) => {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    return payload;
};

/**
 * Verify the token and send back user info
 */
export const verifyToken = (authHeader) => {
    
    const token = authHeader === "undefined" ? false : authHeader

    if(!token) return false

    const decodedToken = decodeJWT(token);
    const { id, pseudo, email } = decodedToken;

    if((!id && id !== 0) || !pseudo || !email) return false

    return decodedToken;
};