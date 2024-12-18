import { JWT_TOKEN_SECRET, statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Jwt from "jsonwebtoken";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const AuthMiddleware = (req, res, next) => {
    if (req.headers["auth"] === undefined) {
        return res.json(jsonGenerate(statusCode.AUTH_ERROR, "Access denied"));
    }

    const token = req.headers["auth"];

    try {
        const decoded = Jwt.verify(token, JWT_TOKEN_SECRET);
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Invalid token",error));
    }

};

export default AuthMiddleware;