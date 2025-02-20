import { menuGerenciamento, voltar } from "..";
import { conectandoAoBanco } from "../config/configBD";
import { UsuarioLog } from "../logs/UsuarioLog";
import { Evento } from "../models/evento";
import { validacaoData } from "../validation/validData";
import { idUserLogado } from "../validation/validLogin";

export async function inserirEvento(evento: Evento): Promise<void> {
    const db = await conectandoAoBanco();
  
    if(!validacaoData(evento.data)) return

    const query = `
        INSERT INTO eventos (nome, data, usuario_id)
        VALUES (?,?,?)
    `
    try {
        const result = await db.run(query, [evento.nome.trim(), evento.data.trim(), evento.usuarioResponsavel, evento.id])

        UsuarioLog.registrarLog(idUserLogado, result.lastID, "Eventos", "INSERT")
        console.log(`\nEvento registrado.\n`);
        menuGerenciamento()
    } catch (err) {
        console.error(`\nErro ao registrar o evento: ${err}\n`);
        menuGerenciamento()
    } finally {
        await db.close();
    }
}