"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json);
dotenv_1.default.config();
const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const serverAddress = server.address();
        console.log(`Hieee. Here's ur server: http://localhost:${serverAddress.port}.`);
    }
    else {
        console.log('Failure upon starting server.');
    }
});
exports.default = app;
