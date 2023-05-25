import checkAuth from "../utils/checkAuth";
import {apiaryCreateValidation} from "../validations/apiary";
import handleValidationErrors from "../utils/handleValidationErrors";
import * as ApiaryController from "../controllers/ApiaryController";
import express from "express";
import BeehiveRouter from "./beehiveRouter";
const cache = require('../config/cacher')

const router = express.Router()

router.use('/apiary/:apiaryId', BeehiveRouter);

router.post('/apiary', checkAuth, apiaryCreateValidation, handleValidationErrors, ApiaryController.createApiary);

router.get('/apiary', checkAuth, cache(300), ApiaryController.getAllApiary);

router.get('/apiary/:apiaryId', checkAuth, cache(300), ApiaryController.getOneApiary);

router.delete('/apiary/:apiaryId', checkAuth, ApiaryController.removeApiary);

router.patch('/apiary/:apiaryId', checkAuth, apiaryCreateValidation, handleValidationErrors, ApiaryController.updateApiary);


export default router;