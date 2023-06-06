import express from 'express'
import * as UserController from "../controllers/UserController"
import {loginValidation, registerValidation} from "../validations/auth";
import handleValidationErrors from "../utils/handleValidationErrors";
import checkAuth from "../utils/checkAuth";
import {checkAdmin} from "../utils/checkAdmin";
import {checkUser} from "../utils/checkUser";
import {getReserveCopy} from "../controllers/UserController";

const router = express.Router()

router.get('/auth/reserve', checkAuth, checkAdmin, UserController.getReserveCopy);

router.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

router.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);

router.patch('/auth/:userId', checkAuth, checkAdmin, UserController.updateUser)

router.put('/auth', checkAuth, checkAdmin, UserController.updateManyUsers)

router.get('/auth/:userId', checkAuth, UserController.getOne);

router.get('/auth/me', checkAuth, UserController.getUser);

router.get('/auth', checkAuth, checkAdmin, UserController.getAllUsers);

router.delete('/auth/:userId', checkAuth, checkAdmin, UserController.deleteUser)

export default router;