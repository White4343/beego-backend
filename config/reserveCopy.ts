import mongoose from 'mongoose';
import { exec } from 'child_process';

const URL = process.env.MONGODB_URL;

const connectionURL = "mongodb+srv://White4343:ae4NEY9mnu9JWLEo@cluster0.cbfaub8.mongodb.net/";

let isConnected = false;

// Establish MongoDB connection
mongoose.connect(`${URL}`, {})
    .then(() => {
        console.log('Connected to MongoDB');
        isConnected = true;
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

export const createReserveCopy = async () => {
    if (!isConnected) {
        console.error('MongoDB connection is not established.');
        return;
    }

    try {
        // Create a backup using mongodump
        const backupCommand = `mongodump --uri="${URL}" --archive=backup.zip --zip`;
        await executeCommand(backupCommand);

        console.log('Reserve copy created successfully.');
    } catch (err) {
        console.error('Error creating reserve copy:', err);
    }
};

const executeCommand = (command: any) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Command failed:', error);
                console.error('Command output:', stderr);
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
};