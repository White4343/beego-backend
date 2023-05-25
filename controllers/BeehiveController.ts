import {Response, Request} from "express";
import BeehiveModel from "../models/Beehive"
import {IBeehive, IReqBeehive} from "../config/interface";
import ApiaryModel from "../models/Apiary";

export const create = async (req: IReqBeehive, res: Response) => {
    try {
        const {name, description, beeCount, honeyCount, deviceID} = req.body;


        const doc = new BeehiveModel({
            name,
            description,
            beeCount,
            honeyCount,
            deviceID,
            apiary: req.params.apiaryId
        })

        await ApiaryModel.findOneAndUpdate({_id: req.params.apiaryId}, {
            $push: {beehives: doc._id}
        })


        const beehive = await doc.save();

        res.json(beehive);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('BEEHIVE.ERROR_CREATE'),
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const beehives = await BeehiveModel.find({apiary: req.params.apiaryId});

        res.json(beehives);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('BEEHIVE.ERROR_GET_ALL'),
        });
    }
};

export const getOne = async (req: IReqBeehive, res: Response) => {
    try {
        const {apiaryId, beehiveId} = req.params;


        // if (req.userId)

        BeehiveModel.findOne(
            {
                _id: beehiveId,
                apiary: apiaryId
            },
            async (err: any, doc: IBeehive) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('BEEHIVE.ERROR_GET_ONE'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('BEEHIVE.NOT_FOUND'),
                    });
                }


                res.json(doc);

            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('BEEHIVE.ERROR_GET_ONE'),
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const {apiaryId, beehiveId} = req.params;

        BeehiveModel.findOneAndDelete(
            {
                _id: beehiveId,
                apiary: apiaryId
            },
            async (err: any, doc: IBeehive) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('BEEHIVE.ERROR_DELETE'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('BEEHIVE.NOT_FOUND'),
                    });
                }


                await ApiaryModel.findOneAndUpdate({_id: req.params.apiaryId}, {
                    $pullAll: {
                        beehives: [{_id: req.params.beehiveId}],
                    },
                })


                res.json({
                    success: true,
                });
            },
        );


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('BEEHIVE.ERROR_GET_ONE'),
        });
    }
};

export const update = async (req: IReqBeehive, res: Response) => {
    try {


        const {name, description, beeCount, honeyCount, deviceID} = req.body;
        const apiaryId = req.params.apiaryId;
        const beehiveId = req.params.beehiveId;

        await BeehiveModel.updateOne(
            {
                _id: beehiveId,
                apiary: apiaryId,
            },
            {
                name,
                description,
                beeCount,
                honeyCount,
                deviceID,
                apiary: req.params.apiaryId
            },
        );


        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('BEEHIVE.ERROR_UPDATE'),
        });
    }
};
