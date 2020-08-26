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
exports.HashGenerator = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class HashGenerator {
    hash(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const rounds = Number(process.env.BCRYPT_COST); /*Custo do algoritmo - maior, mais complexo o processo de hash*/
            const salt = yield bcryptjs_1.default.genSalt(rounds); /*Ferramenta que encripta com base no custo*/
            return bcryptjs_1.default.hash(text, salt); /*Método retorna o texto encriptado com base no salts*/
        });
    }
    compare(text, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(text, hash); /*Método que verifica se o texto e hash são os mesmos*/
            /*Retorna true ou false de acordo com o resultado.*/
        });
    }
}
exports.HashGenerator = HashGenerator;
