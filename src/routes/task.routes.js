import { Router } from "express";
import { createTask, getAllTask, deleteTask } from "../controllers/task.controller.js";
import validations from "../validators/task.validator.js";



const router = Router()

router.post('/create-task', validations.taskValidate, createTask);
router.get('/list-task', getAllTask);
router.post('/delete-task', deleteTask);


export default router;