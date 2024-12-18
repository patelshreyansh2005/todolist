import { check } from "express-validator";

export const RegisterSchema = [
    check('name').trim(),
    check('username', 'username is required').exists().trim(),
    check('password', 'password is required').exists().trim(),
    check('email', 'email is required').exists().isEmail(),
]