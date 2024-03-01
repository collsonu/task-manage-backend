import { check } from "express-validator";
import formValidation from "./other.validator.js";
const validations = {
    taskValidate: [
        check("title")
            .notEmpty().withMessage("Title is required"),
        check("description")
            .notEmpty().withMessage("Description is required"),
        check("dueDate")
            .notEmpty().withMessage("Due Date is required"),
        check("priority")
            .notEmpty().withMessage("Priority is required"),
        check("tags")
            .notEmpty().withMessage("Tags is required"),
        // check("status")
        //     .notEmpty().withMessage("status is required"),

        formValidation,
    ],
};

export default validations;
