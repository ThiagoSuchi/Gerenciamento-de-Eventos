import { conectandoAoBanco } from "../config/configBD";
import { Evento } from "../models/evento";
import { validacaoData } from "../utils/validData";

export async function inserirEvento(evento: Evento): Promise<void> {
    const db = await conectandoAoBanco();

    if(!validacaoData(evento.data)) return

    const query = `
        INSERT INTO eventos (nome, data, usuario_id)
        VALUES (?,?,?)
    `
    try {
        const result = await db.run(query, [evento.nome, evento.data, evento.usuarioResponsavel, evento.id])
        const eventID = result.lastID

        await db.run(`INSERT INTO logs(acao, tabela_afetada, item_afetado) VALUES(?,?,?)`, ['insert', 'eventos', eventID]);
        
        console.log(`Evento registrado.`);
    } catch (err) {
        console.log(`Erro ao registrar o evento: ${err}`);
    } finally {
        await db.close();
    }
}