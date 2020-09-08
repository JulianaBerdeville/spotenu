"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const userController = new UserController_1.UserController();
exports.user = express_1.default.Router();
exports.user.post("/signup", userController.signUp);
exports.user.post("/adminSignUp", userController.adminSignUp);
exports.user.post("/login", userController.login);
exports.user.post("/bandSignUp", userController.bandSignUp);
exports.user.get("/getAllBands", userController.getAllBands);
exports.user.post("/gettingBandApproved", userController.gettingBandApproved);
