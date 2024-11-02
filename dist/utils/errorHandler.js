"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError_1.default) {
        res.status(error.errorCode).send({ errors: error.serializeErrors() });
    }
    res.status(500).send({ errors: [{ message: error.message, errorCode: 500 }] });
};
exports.errorHandler = errorHandler;
