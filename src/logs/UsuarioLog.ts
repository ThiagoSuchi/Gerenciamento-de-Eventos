import fs from 'fs';
import path from 'path';

export class UsuarioLog {
    private static logFilepth = path.join(__dirname, "usuario.log");

    static registrarLog(idUser?: number, idTabela?: number, tabela?: string, acao?: string): void {
        const dataHora = new Date().toISOString();
        
        const tabelaIndentificador =  idTabela === undefined ? '-' : idTabela
        
        const registro = `Usuário ID: ${idUser} | Ação: ${acao} | Tabela: ${tabela} | Tabela ID: ${tabelaIndentificador} | Data/Hora: ${dataHora}`

        fs.appendFileSync(this.logFilepth, registro + '\n');
    }
}