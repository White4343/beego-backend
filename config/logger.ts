const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');
require('dotenv').config()

const URL = process.env.MONGODB_URL;

export const serverLogger = createLogger({
    transports: [
        new transports.MongoDB({
            db: URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'serverLog',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

export const userLogger = createLogger({
    transports: [
        new transports.MongoDB({
            db: URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'userLog',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})