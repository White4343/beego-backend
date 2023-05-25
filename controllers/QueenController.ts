import {Request, Response} from 'express';
import QueenModel from '../models/Queen';
import {IQueen} from '../config/interface';

export const create = async (req: Request, res: Response) => {
    try {
        const {name, description, introducedFrom, reQueenedFrom, isOut} = req.body;

        const doc = new QueenModel({
            name,
            description,
            introducedFrom,
            reQueenedFrom,
            isOut,
            beehive: req.params.beehiveId,
        });

        const queen = await doc.save();

        res.json(queen);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('QUEEN.ERROR_CREATE'),
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        QueenModel.findOne(
            {
                beehive: req.params.beehiveId,
            },
            (err: any, doc: IQueen) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('QUEEN.ERROR_GET_ONE'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('QUEEN.NOT_FOUND'),
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('QUEEN.ERROR_GET_ONE'),
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const {name, description, introducedFrom, reQueenedFrom, isOut} = req.body;

        await QueenModel.updateOne(
            {
                beehive: req.params.beehiveId,
            },
            {
                name,
                description,
                introducedFrom,
                reQueenedFrom,
                isOut,
                beehive: req.params.beehiveId,
            },
        );
        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('QUEEN.ERROR_UPDATE'),
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        QueenModel.findOneAndDelete(
            {
                beehive: req.params.beehiveId,
            },
            (err: any, doc: IQueen) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('QUEEN.ERROR_DELETE'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('QUEEN.NOT_FOUND'),
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('QUEEN.ERROR_GET_ONE'),
        });
    }
};
