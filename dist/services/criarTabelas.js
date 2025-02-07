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
exports.criarTabelas = criarTabelas;
const configBD_1 = require("../config/configBD");
function criarTabelas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield (0, configBD_1.conectandoAoBanco)();
            yield db.exec(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                senha TEXT NOT NULL
            )
        `);
            yield db.exec(`
            CREATE TABLE IF NOT EXISTS eventos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                data TEXT NOT NULL,
                usuario_id INTEGER NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
            )
        `);
            yield db.exec(`
            CREATE TABLE IF NOT EXISTS logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                acao TEXT NOT NULL,
                tabela_afetada TEXT NOT NULL,
                registro INTEGER NOT NULL,
                usuario_id INTEGER NOT NULL,
                data_hora DATETIME DEFAULT CURRENT_TIMESTEMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
            )    
        `);
            console.log('Tabelas criadas com sucesso.');
        }
        catch (err) {
            console.log('Erro ao criar tabelas: ', err);
        }
    });
}
