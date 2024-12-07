"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Invalid token - Not Logged In",
                });
            }
            else {
                req.userId = decoded.id;
                next();
            }
        });
    }
    else {
        res.status(401).send({
            message: "No token provided",
        });
    }
};
exports.userAuthMiddleware = userAuthMiddleware;
