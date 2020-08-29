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
const index_1 = __importDefault(require("../index"));
const IdGenerator_1 = require("../services/IdGenerator");
const HashGenerator_1 = require("../services/HashGenerator");
const Authenticator_1 = require("../services/Authenticator");
const UserDatabase_1 = require("../data/UserDatabase");
index_1.default.post("SignUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const nickname = req.body.nickname;
        const password = req.body.password;
        /*Validando informações fornecidas no body*/
        if (!name || email || nickname || password) {
            throw new Error("Oops! Something's missing");
        }
        if (password.length < 6) {
            throw new Error("Your password must have, at least, 6 characters long.");
        }
        /*Gerando um id ao usuário*/
        const idGenerator = new IdGenerator_1.IdGenerator();
        const id = idGenerator.generateId();
        /*Encriptando a senha do usuário*/
        const hashGenerator = new HashGenerator_1.HashGenerator();
        const hashedPassword = yield hashGenerator.hash(password);
        const userDatabase = new UserDatabase_1.UserDatabase();
        yield userDatabase.signUp(id, name, email, nickname, hashedPassword);
        const authenticator = new Authenticator_1.Authenticator();
        const token = authenticator.generateToken({ id });
        res.status(200).send({ message: "Welcome. Here's your access token: ", token });
    }
    catch (error) {
        res.status(400).send({ message: "Oops! Something's wrong: ", error });
    }
}));
index_1.default.get("/getBands", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ message: 'it works!' });
}));
