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
exports.inserirUsuario = inserirUsuario;
const configBD_1 = require("../config/configBD");
const validUsuario_1 = require("../utils/validUsuario");
function inserirUsuario(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, email, senha } = usuario;
        const valid = validUsuario_1.validacao.safeParse({ nome, email, senha });
        const db = yield (0, configBD_1.conectandoAoBanco)();
        if (!valid.success) {
            console.log('Erro na validação: ', valid.error.format());
            return;
        }
        const query = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?,?,?)
    `;
        try {
            yield db.run(query, [usuario.nome, usuario.email, usuario.senha, usuario.id]);
            console.log(`Usuário cadastrado com sucesso.`);
        }
        catch (err) {
            console.log(`Erro ao cadastrar um novo usuário: ${err}`);
        }
        finally {
            yield db.close();
        }
    });
}
