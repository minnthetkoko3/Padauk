import { check } from "express-validator";

export const validateRegisterInput = [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include is valid email!").isEmail(),
    check("password", "Password is more than * characters").isLength({
        min: 8, max: 20
    })
]

export const validateLoginInput = [
    check("email", "Please include a valid email!").isEmail(),
    check("password", "Password is required").exists(),
]