import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import express from "express";
import cors from "cors";
import routes from "../routes";
import * as dotenv from 'dotenv';

function createServer() {
    i18next.use(Backend).use(middleware.LanguageDetector).init({
            fallbackLng: 'eng',
            backend: {
                loadPath: './i18n/{{lng}}/translation.json'
            }
        }
    )


// Middleware
    const app = express();
    app.use(middleware.handle(i18next));
    app.use(express.json());
    app.use(cors());
    app.use('/uploads', express.static('uploads'));

// Routes
    app.use('/api', routes.authRouter);
    app.use('/api', routes.sensorRouter);
    app.use('/api', routes.apiaryRouter);
    app.use('/api', routes.productRouter);
    app.use('/api', routes.uploadRouter);
    app.use('/api', routes.cartRouter);

    return app
}

export default createServer