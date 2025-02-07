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
exports.inserirEvento = inserirEvento;
const configBD_1 = require("../config/configBD");
const validData_1 = require("../utils/validData");
function inserirEvento(evento) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, configBD_1.conectandoAoBanco)();
        if (!(0, validData_1.validacaoData)(evento.data))
            return;
        const query = `
        INSERT INTO eventos (nome, data, usuario_id)
        VALUES (?,?,?)
    `;
        try {
            yield db.run(query, [evento.nome, evento.data, evento.usuarioResponsavel, evento.id]);
            console.log(`Evento registrado.`);
        }
        catch (err) {
            console.log(`Erro ao registrar o evento: ${err}`);
        }
        finally {
            yield db.close();
        }
    });
}
