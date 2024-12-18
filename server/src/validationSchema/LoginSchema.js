import { check } from "express-validator";

export const LoginSchema = [
    check('username', 'username is required').exists().trim(),
    check('password', 'password is required').exists().trim(),
]