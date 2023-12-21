"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(name, message, code) {
        super(String(message));
        this.name = name;
        this.code = code;
    }
}
exports.default = CustomError;
