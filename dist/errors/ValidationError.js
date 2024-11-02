"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(message, property) {
        super(message);
        this.property = property;
        this.errorCode = 400;
    }
    serializeErrors() {
        return [{ message: this.message, property: this.property, errorCode: this.errorCode }];
    }
}
exports.default = ValidationError;
