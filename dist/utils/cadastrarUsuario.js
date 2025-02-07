"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarUsuario = cadastrarUsuario;
const inserirUsuario_1 = require("../services/inserirUsuario");
function cadastrarUsuario(nome, email, senha) {
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };
    (0, inserirUsuario_1.inserirUsuario)(novoUsuario);
}
