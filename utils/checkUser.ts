import jwt from 'jsonwebtoken';
import {Response, NextFunction} from "express";
import {IReqGetMe, IDecodedToken} from "../config/interface";
import UserModel from "../models/User";
import {ROLE} from "./roles";

export const checkUser = async (req: IReqGetMe, res: Response, next: NextFunction) => {
    const user = await UserModel.findOne(
        {
            _id: req.userId,
        })

    if (!user) {
        return res.status(404).json({
            message: req.t('USER.ERROR_GET_ONE'),
        });
    }

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = <IDecodedToken>jwt.verify(token, `${process.env.SECRET_TOKEN_KEY}`);

            if (req.userId === decoded._id) {
                return res.status(500).json({
                    message: req.t('USER.ERROR_ACCESS'),
                });
            }

            req.userId = decoded._id;

            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({
                message: req.t('USER.ERROR_ACCESS'),
            });
        }
    } else
        return res.status(403).json({
            message: req.t('USER.ERROR_ACCESS'),
        });
};
