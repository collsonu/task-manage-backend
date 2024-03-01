import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import validations from "../validators/user.validator.js";



const router = Router()

router.post('/create-user', validations.validateUser, registerUser);
router.post('/login-user', validations.checkUser, validations.userLogin, validations.checkUserPassword, loginUser);
router.get('/logout-user', logoutUser);


export default router;