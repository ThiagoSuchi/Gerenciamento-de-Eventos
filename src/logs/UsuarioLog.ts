import fs from 'fs';
import path from 'path';

export class UsuarioLog {
    private static logFilepth = path.join(__dirname, "usuario.log");

    static registrarLog(idUser: number, idTabela?: number, tabela?: string, acao?: string): void {
        const dataHora = new Date().toISOString();
        const registro = `Usuário ID: ${idUser}\nAção: ${acao}\nTabela: ${tabela}\nTabela ID: ${idTabela}\nData/Hora: ${dataHora}\n`
        
        try {
            fs.appendFileSync(this.logFilepth, registro + '\n');
        } catch (err) {
            console.error('Erro ao tentar registrar log: ', err);
        }
    }
}