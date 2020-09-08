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
exports.UserBusiness = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
class UserBusiness {
    constructor() {
        this.userDatabase = new UserDatabase_1.UserDatabase();
    }
    insertCommonUsers(input) {
        return __awaiter(this, void 0, void 0, function* () {
            /*Regras pra cadastro de usuários pagos ou ouvintes*/
            yield this.userDatabase.createNewUsers(input);
            if (input.password.length < 6) {
                throw new Error("Your password should be, at least, 6 characters long.");
            }
        });
    }
    insertAdminUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDatabase.createNewAdminUser(input);
            if (input.password.length < 10) {
                throw new Error("Your password should be, at least, 10 characters long.");
            }
        });
    }
    getUserByEmailOrNickname(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDatabase.login(login);
        });
    }
    insertBand(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDatabase.bandSignUp(input);
            if (input.password.length < 6) {
                throw new Error("Your password should be, at least, 6 characters long.");
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
