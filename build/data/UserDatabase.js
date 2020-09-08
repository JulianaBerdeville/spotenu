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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    createNewUsers(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .raw(`INSERT INTO ${UserDatabase.TABLE_NAME}(id, name, nickname, email, password, role)
                VALUES (
                    "${input.id}",
                    "${input.name}",
                    "${input.nickname}",
                    "${input.email}",
                    "${input.password}",
                    "free_users"
                )`);
            }
            catch (e) {
                throw new Error("Data insertion error: " + e.message);
            }
        });
    }
    createNewAdminUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .raw(`INSERT INTO ${UserDatabase.TABLE_NAME}(id, name, nickname, email, password, role)
                VALUES (
                    "${input.id}",
                    "${input.name}",
                    "${input.nickname}",
                    "${input.email}",
                    "${input.password}",
                    "admin")`);
            }
            catch (e) {
                throw new Error("Data insertion error: " + e.message);
            }
        });
    }
    bandSignUp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .raw(`INSERT INTO ${UserDatabase.BANDS_TABLE}(id, name, nickname, email, password, role, description, band_approved)
            VALUES (
                "${input.id}",
                "${input.name}",
                "${input.nickname}",
                "${input.email}",
                "${input.password}",
                "band",
                "${input.description}",
                0)`);
            }
            catch (e) {
                throw new Error("Data insertion error: " + e.message);
            }
        });
    }
    becomePremiumUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .raw(`
                UPDATE ${UserDatabase.TABLE_NAME}(role))
                SET role = 'paid_users'
                WHERE (${id})
            `);
            }
            catch (e) {
                throw new Error("Error changing user's role " + e.message);
            }
        });
    }
    login(login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .from(UserDatabase.TABLE_NAME)
                    .where({ email: login })
                    .orWhere({ nickname: login });
                return result[0];
            }
            catch (e) {
                throw new Error("Login failed: " + e.message);
            }
        });
    }
    getAllBands() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("name", "email", "nickname", "band_approved")
                    .from(UserDatabase.BANDS_TABLE);
                return result;
            }
            catch (e) {
                throw new Error("Query failed: " + e.message);
            }
        });
    }
    approveBand(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .raw(`
                    UPDATE ${UserDatabase.BANDS_TABLE}
                    SET band_approved = 1
                    WHERE name = "${name}"
                `);
            }
            catch (e) {
                throw new Error("Query failed: " + e.message);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = 'Users';
UserDatabase.BANDS_TABLE = 'Bands';
