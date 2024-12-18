import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode, JWT_TOKEN_SECRET } from "../utils/constants.js";
import User from '../models/User.js';
import Jwt from 'jsonwebtoken';
const Register = async (req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { name, username, password, email } = req.body;

        const userExist = await User.findOne({
            $or: [
                {
                    email: email
                },
                {
                    username: username
                }
            ]
        });

        if (userExist) {
            return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "User or Email already exists"));
        }

        try {
            const result = await User.create({
                name: name,
                email: email,
                password: password,
                username: username
            })

            const token = Jwt.sign({ userIs: result._id }, JWT_TOKEN_SECRET);

            res.json(jsonGenerate(statusCode.SUCCESS, "Registration successfull", { userId: result._id, token: token}));
        }
        catch (error) {
            console.log(error);
        }

    }
}

export default Register;