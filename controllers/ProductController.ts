import {IProduct, IReqApiary} from '../config/interface';
import {Request, Response} from 'express';
import ProductModel from '../models/Product';

export const create = async (req: Request, res: Response) => {
    try {
        const {title, price, description, imageUrl} = req.body;

        const doc = new ProductModel({
            title,
            price,
            description,
            imageUrl,
        });

        const product = await doc.save();

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('PRODUCT.ERROR_CREATE'),
        });
    }
};

export const getAll = async (req: IReqApiary, res: Response) => {
    try {
        let {sort, filter} = req.query;

        sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
        filter = filter == undefined ? {} : JSON.parse(req.query.filter as string) || {};

        const products = await ProductModel.find(filter as object).sort(sort as []);

        res.json({data: products});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('PRODUCT.ERROR_GET_ALL'),
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;

        ProductModel.findOne(
            {
                _id: productId,
            },
            (err: any, doc: IProduct) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('PRODUCT.ERROR_GET_ONE'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('PRODUCT.NOT_FOUND'),
                    });
                }

                res.json(doc);
            },
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('PRODUCT.ERROR_GET_ONE'),
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const {title, price, description, imageUrl} = req.body;
        const productId = req.params.productId;

        const product = await ProductModel.updateOne(
            {
                _id: productId,
            },
            {
                title,
                price,
                description,
                imageUrl,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('PRODUCT.ERROR_UPDATE'),
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;

        ProductModel.findOneAndDelete(
            {
                _id: productId,
            },
            async (err: any, doc: IProduct) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: req.t('PRODUCT.ERROR_DELETE'),
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: req.t('PRODUCT.NOT_FOUND'),
                    });
                }

                res.json({
                    data: doc,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: req.t('PRODUCT.ERROR_GET_ONE'),
        });
    }
};
