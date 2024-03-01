import { validationResult } from 'express-validator';

function formValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        });
    } else {
        next();
    }
}
export default formValidation;