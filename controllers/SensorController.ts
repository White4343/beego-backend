import SensorModel from '../models/Sensor';
import SensorDataModel from '../models/SensorData';
import {Request, Response} from "express";
import {IQueen, IReqSensor, ISensor} from "../config/interface";

export const create = async (req: Request, res: Response) => {
    try {
        const {humidity, temperature, status, temperatureRegime, apiKey, deviceID} = req.body;

        if (apiKey === process.env.SENSOR_API) {
            const doc = new SensorModel({
                deviceID,
                temperature,
                humidity,
                status,
                temperatureRegime,
                createdAt: new Date(),
            });

            const sensor = await doc.save();


            return res.json(sensor);
        } else {
            return res.status(403).json({
                message: req.t('USER.ERROR_ACCESS'),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: req.t('USER.ERROR_DATA'),
        });
    }
};


export const update = async (req: Request, res: Response) => {
    try {
        const {humidity, temperature, status, apiKey, deviceID} = req.body;

        if (apiKey === process.env.SENSOR_API) {

            await SensorModel.updateOne(
                {
                    deviceID: deviceID
                },
                {
                    temperature,
                    humidity,
                    status,
                    deviceID: deviceID
                },
            );

            const doc = new SensorDataModel({
                deviceID,
                temperature,
                humidity,
                status,
                createdAt: new Date(),
            });

            const sensor = await doc.save();

            res.json({
                success: true,
            });

        } else {
            return res.status(403).json({
                message: req.t('USER.ERROR_ACCESS'),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: req.t('USER.ERROR_DATA'),
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const {apiKey, deviceID} = req.body;

        if (apiKey === process.env.SENSOR_API) {

            SensorModel.findOneAndDelete(
                {
                    deviceID: deviceID
                },
                (err: any, doc: ISensor) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: req.t('USER.ERROR_DATA'),
                        });
                    }

                    if (!doc) {
                        return res.status(404).json({
                            message: req.t('USER.ERROR_DATA'),
                        });
                    }

                    res.json({
                        success: true,
                    });
                },
            )


        } else {
            return res.status(403).json({
                message: req.t('USER.ERROR_ACCESS'),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: req.t('USER.ERROR_DATA'),
        });
    }
};

export const getOne = async (req: IReqSensor, res: Response) => {
    try {
        const {deviceID} = req.params;

        console.log('hello123')

        SensorModel.findOne(
            {deviceID: deviceID},
            (err: any, doc: ISensor) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('USER.ERROR_DATA'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('USER.ERROR_DATA'),
                    });
                }

                res.json(doc);
            },
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: req.t('USER.ERROR_DATA'),
        });
    }
};