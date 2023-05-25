import express from 'express'
import * as UserController from "../controllers/UserController"
import {loginValidation, registerValidation} from "../validations/auth";
import handleValidationErrors from "../utils/handleValidationErrors";
import checkAuth from "../utils/checkAuth";
import {checkAdmin} from "../utils/checkAdmin";
import {checkUser} from "../utils/checkUser";

const router = express.Router()

router.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

router.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);

router.get('/auth/me', checkAuth, UserController.getUser);

router.get('/auth/all', checkAuth, checkAdmin, UserController.getAllUsers);

router.delete('/auth/:userId', checkAuth, checkAdmin, UserController.deleteUser)

router.patch('/auth/:userId', checkAuth, checkAdmin, registerValidation, handleValidationErrors, UserController.updateUser)

export default router;