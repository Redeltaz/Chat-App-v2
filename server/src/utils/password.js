import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT = parseInt(process.env.SALT);

/**
 * Hash the given password 
 */
export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, SALT);
    
    return hashedPassword;
};

/**
 * Compare password and hashed password to tell if they are the same
 */
export const isSamePassword = async (password, hashedPassword) => {
    const isSame = await bcrypt.compare(password, hashedPassword);

    return isSame;
};