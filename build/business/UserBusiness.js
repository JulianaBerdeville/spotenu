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
    FreeUsersSignUp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDatabase.signUp(input.id, input.name, input.email, input.nickname, input.password);
        });
    }
    PaidUsersLogin(input) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UserBusiness = UserBusiness;
