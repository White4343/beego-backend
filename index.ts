import express from 'express';
import routes from './routes';
import cors from 'cors';
import * as dotenv from 'dotenv';
import i18next from "i18next";
import Backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'
import createServer from "./config/server";

dotenv.config();

const app = createServer();

// Database
import './config/database';
import {serverLogger} from "./config/logger";

// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    serverLogger.log('info', `Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`)
});
