import NodeCache from "node-cache";
import {NextFunction, Response, Send} from "express";

const cache = new NodeCache();

module.exports = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET"){
        console.log('Cannot cache non-GET methods')
        return next()
    }

    const key = req.url;
    const cachedRes = cache.get(key)

    if (cachedRes) {
        res.json(cachedRes);
    }
    else {
        let originalJson = res.json.bind(res)

        res.json = (body: any): Response<any, Record<string, any>> => {
            originalJson(body);
            cache.set(key, body, duration);
            return res
        };
        next();
    }
}