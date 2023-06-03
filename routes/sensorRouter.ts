import * as SensorController from "../controllers/SensorController";
import express from "express";

const router = express.Router()

router.post('/sensor', SensorController.create);
router.patch('/sensor', SensorController.update);
router.delete('/sensor', SensorController.remove);
router.get('/sensor/:deviceID', SensorController.getOne);


export default router;