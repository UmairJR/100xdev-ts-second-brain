"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//SIGN UP
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.UserModel.create({
            username: username,
            password: hashedPassword,
            date: new Date(),
        });
        res.json({
            message: "User Signed Up",
        });
    }
    catch (e) {
        res.status(411).send({
            message: "User Already Exists",
        });
    }
}));
//SIGN IN
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield db_1.UserModel.findOne({ username });
    if (existingUser && typeof existingUser.password == "string") {
        const matched = yield bcrypt_1.default.compare(password, existingUser.password);
        if (matched) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id,
            }, `${process.env.JWT_SECRET}`);
            res.json({
                token: token,
            });
        }
        else {
            res.status(401).send({
                message: "Invalid password",
            });
        }
    }
    else {
        res.status(403).json({
            message: "User Not Found",
        });
    }
}));
// USING AUTH
app.use(middleware_1.userAuthMiddleware);
// UPLOADING CONTENT
app.post("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    try {
        yield db_1.ContentModel.create({
            title: title,
            link: link,
            type: type,
            userId: req.userId,
            tags: [],
            date: new Date()
        });
        res.json({
            message: "Content Added"
        });
    }
    catch (e) {
        res.status(401).send({
            message: "Can't add"
        });
    }
}));
// GETTING CONTENT
app.get("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield db_1.ContentModel.find({ userId: req.userId }).populate("userId", "username");
        res.json({
            content
        });
    }
    catch (e) {
        res.status(401).send({
            message: "Can't get"
        });
    }
}));
// DELETING CONTENT
app.delete("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.body;
        yield db_1.ContentModel.deleteOne({ _id: contentId, userId: req.userId });
        res.json({
            message: "Content Deleted"
        });
    }
    catch (e) {
        res.status(401).send({
            message: "Can't delete"
        });
    }
}));
// STARTING APP AND CONNECTING DB
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDb)();
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});
startApp();
