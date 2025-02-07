"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarEventos = registrarEventos;
const inserirEvento_1 = require("../services/inserirEvento");
function registrarEventos(nome, data, responsavel) {
    const novoEvento = {
        nome: nome,
        data: data,
        usuarioResponsavel: responsavel
    };
    (0, inserirEvento_1.inserirEvento)(novoEvento);
}
