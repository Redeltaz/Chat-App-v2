import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
const JWT_EXPIRE = parseInt(process.env.JWT_EXPIRE);

/**
 * Generate JWT
 */
export const generateJWT = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        algorithm: JWT_ALGORITHM,
        expiresIn: JWT_EXPIRE,
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