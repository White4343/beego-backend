import mongoose from "mongoose";

export const userId = new mongoose.Types.ObjectId().toString();

export const userPayload = {
    _id: userId,
    email: "jane.doe@example.com",
    name: "Jane Doe",
};

export const userInput = {
    email: "test@example.com",
    fullName: "Jane Doe",
    password: "Password123"
};

export const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    updatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0,
};