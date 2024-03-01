import { check } from "express-validator";
import formValidation from "./other.validator.js";
import { User } from "../models/user.model.js";

const validations = {

    validateUser: [
        check("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is not valid")
            .custom(async (value, { req }) => {
                const result = await User.find({ email: value });
                if (result?.length) {
                    throw new Error("A user already exits with this email");
                }
            }),
        check("fullName")
            .notEmpty().withMessage("Full name is required"),
        check("password")
            .notEmpty().withMessage("Password is required"),
        formValidation
    ],

    userLogin: [
        check('email')
            .notEmpty().withMessage("Provide a Email")
            .isEmail().withMessage("Email is not valid"),

        check('password')
            .notEmpty().withMessage("Provide a password"),

        formValidation
    ],
    checkUser: async (req, res, next) => {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
        else {
            next()
        }
    },
    checkUserPassword: async (req, res, next) => {
        const userData = await User.findOne({ email: req.body.email });
        const isPasswordValid = await userData.isPasswordCorrect(req.body.password)

        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
        else {
            next()
        }

    },
}
export default validations;