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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const IdGenerator_1 = require("../services/IdGenerator");
const HashGenerator_1 = require("../services/HashGenerator");
const Authenticator_1 = require("../services/Authenticator");
const UserBusiness_1 = require("../business/UserBusiness");
const BaseDatabase_1 = require("../data/BaseDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /*Gerando um id ao usuário*/
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generateId();
                /*Encriptando a senha do usuário*/
                const hashGenerator = new HashGenerator_1.HashGenerator();
                const hashedPassword = yield hashGenerator.hash(req.body.password);
                const body = {
                    id,
                    name: req.body.name,
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: hashedPassword
                };
                /*Validando informações fornecidas no body*/
                if (!body.name || !body.email || !body.nickname || !body.password) {
                    throw new Error("Oops! Something's missing");
                }
                const userBusiness = new UserBusiness_1.UserBusiness();
                yield userBusiness.insertCommonUsers(body);
                const role = "free_users";
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.generateToken({ id, role });
                res.status(200).send({
                    message: `Welcome, ${body.name}. Check your access token below: `, token
                });
            }
            catch (e) {
                res.status(400).send({ e });
            }
        });
    }
    adminSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generateId();
                const hashGenerator = new HashGenerator_1.HashGenerator();
                const hashedPassword = yield hashGenerator.hash(req.body.password);
                const body = {
                    id,
                    name: req.body.name,
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: hashedPassword,
                };
                console.log(body);
                if (!body.name || !body.email || !body.nickname || !body.password) {
                    throw new Error("Oops! Something's missing");
                }
                const userBusiness = new UserBusiness_1.UserBusiness();
                yield userBusiness.insertAdminUser(body);
                const role = "admin";
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.generateToken({ id: id, role: role });
                const headers = req.headers.authorization;
                const isAdmin = authenticator.verify(headers);
                if (isAdmin.role !== 'admin') {
                    throw new Error("Please, provide admin access token to proceed.");
                }
                res.status(200).send({
                    message: `Welcome, ${body.name}. You're an admin user. Check your access token below: `, token
                });
            }
            catch (e) {
                res.status(400).send({ message: "Only admin users are allowed to add other admin user. Please, provide authorization token." });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = {
                    login: req.body.login,
                    password: req.body.password
                };
                const userBusiness = new UserBusiness_1.UserBusiness();
                const user = yield userBusiness.getUserByEmailOrNickname(body.login);
                if (!user) {
                    throw new Error("Email or nickname provided might be wrong.");
                }
                const hashGenerator = new HashGenerator_1.HashGenerator();
                const result = yield hashGenerator.compare(body.password, user.password);
                if (!result) {
                    throw new Error("Some of the user informations provided are incorrect.");
                }
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.generateToken({ id: user.id, role: user.role });
                res.status(200).send({ message: `Wellcome again,${user.name}. Here's your access token:`, token });
            }
            catch (e) {
                res.status(400).send({ message: 'Something went wrong in the endpoint.' + e.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    bandSignUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /*Gerando um id à banda*/
                const idGenerator = new IdGenerator_1.IdGenerator();
                const id = idGenerator.generateId();
                /*Encriptando a senha da banda*/
                const hashGenerator = new HashGenerator_1.HashGenerator();
                const hashedPassword = yield hashGenerator.hash(req.body.password);
                const role = "band";
                const body = {
                    id,
                    name: req.body.name,
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: hashedPassword,
                    role,
                    description: req.body.description,
                    isBandApproved: 0
                };
                /*Validando informações fornecidas no body*/
                if (!body.name || !body.email || !body.nickname || !body.password || !body.description) {
                    throw new Error("Oops! Something's missing");
                }
                const userBusiness = new UserBusiness_1.UserBusiness();
                yield userBusiness.insertBand(body);
                res.status(200).send({
                    message: `Welcome, ${body.name}. You will receive news about the band's approval soon.`
                });
            }
            catch (e) {
                res.status(400).send({ message: "Something went wrong in the endpoint: " + e });
            }
        });
    }
    getAllBands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = req.headers.authorization;
                const authenticator = new Authenticator_1.Authenticator();
                const isAdmin = authenticator.verify(headers);
                if (isAdmin.role !== 'admin') {
                    throw new Error("Please, provide admin access token to proceed.");
                }
                const userDatabase = new UserDatabase_1.UserDatabase();
                const bands = yield userDatabase.getAllBands();
                console.log(bands);
                res.status(200).send({ bands });
            }
            catch (error) {
                res.status(400).send({ message: "Something went wrong with the endpoint: " + error.message });
            }
        });
    }
    gettingBandApproved(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = req.headers.authorization;
                const authenticator = new Authenticator_1.Authenticator();
                const isAdmin = authenticator.verify(headers);
                if (isAdmin.role !== 'admin') {
                    throw new Error("Please, provide admin access token to proceed.");
                }
                const name = req.body.name;
                const userDatabase = new UserDatabase_1.UserDatabase();
                yield userDatabase.approveBand(name);
                res.status(200).send({ message: `Right on! ${name}'s just approved!` });
            }
            catch (error) {
                res.status(400).send({ message: "Something went wrong with the endpoint: " + error.message });
            }
        });
    }
}
exports.UserController = UserController;
