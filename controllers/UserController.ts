import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {Request, Response} from 'express'

import UserModel from '../models/User';
import {IApiary, IReqApiary, IReqGetMe, IUser} from "../config/interface";
import ApiaryModel from "../models/Apiary";
import {userLogger} from "../config/logger";

export const register = async (req: Request, res: Response) => {
    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            role: req.body.role,
            passwordHash: hash,
        });

        const user = await doc.save();


        const token = jwt.sign(
            {
                _id: user._id,
            },
            `${process.env.SECRET_TOKEN_KEY}`,
            {
                expiresIn: '30d',
            },
        );


        const {passwordHash, ...userData} = user._doc as IUser;


        res.json({userData, token});

        userLogger.log('info', `User added with ${req.body.email}`);

    } catch (error) {
        console.log(error);

        userLogger.log('error', `Failed to add user with ${req.body.email}`);

        res.status(500).json({
            message: req.t('USER.ERROR_CREATE'),
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: req.t('USER.NOT_FOUND'),
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: req.t('USER.ERROR_PASSWORD'),
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            `${process.env.SECRET_TOKEN_KEY}`,
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc as IUser;

        res.json({userData, token});

        userLogger.log('info', `User logged with ${req.body.email}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: req.t('USER.ERROR_LOGIN'),
        });

        userLogger.log('error', `Failed to login user with ${req.body.email}`);
    }
};

export const getUser = async (req: IReqGetMe, res: Response) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: req.t('USER.NOT_FOUND'),
            });
        }

        const {passwordHash, ...userData} = user._doc as IUser;

        res.json(userData);

        userLogger.log('info', `User getMe with ${user.email}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: req.t('USER.ERROR_ACCESS'),
        });

    }
};

export const getAllUsers = async (req: IReqGetMe, res: Response) => {
    try {
        const user = await UserModel.find();

        if (!user) {
            return res.status(404).json({
                message: req.t('USER.NOT_FOUND'),
            });
        }

        res.json(user);

        userLogger.log('info', `User getAll with ${req.userId}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: req.t('USER.ERROR_ACCESS'),
        });
    }
};

export const deleteUser = async (req: IReqGetMe, res: Response) => {
    try {
        const userId = req.params.userId;

        console.log(userId);

        UserModel.findOneAndDelete(
            {
                _id: req.userId,
            },
            async (err: any, doc: IUser) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('USER.ERROR_GET_ONE'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('USER.NOT_FOUND'),
                    });
                }

                await ApiaryModel.deleteMany({user: userId});

                res.json({
                    success: true,
                });

                userLogger.log('info', `User deleted user with ${userId}`);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('USER.ERROR_DELETE'),
        });
    }
};

export const updateUser = async (req: IReqGetMe, res: Response) => {
    try {
        const {password, email, fullName, role} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const userId = req.params.userId;

        await UserModel.updateOne(
            {
                _id: userId
            },
            {
                email: email,
                fullName: fullName,
                role: role,
                passwordHash: hash,
            },
        );

        res.json({
            success: true,
        });

        userLogger.log('info', `User updated user with ${userId}`);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('USER.ERROR_UPDATE'),
        });
    }
};
