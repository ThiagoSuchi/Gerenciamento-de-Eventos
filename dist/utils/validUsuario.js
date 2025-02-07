"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacao = void 0;
const zod_1 = __importDefault(require("zod"));
exports.validacao = zod_1.default.object({
    nome: zod_1.default.string().min(4, 'O nome deve conter no mínimo 4 caracteres.'),
    email: zod_1.default.string().email('Email inválido.'),
    senha: zod_1.default.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial')
        .regex(/\d/, 'A senha deve conter pelo menos um número')
});
