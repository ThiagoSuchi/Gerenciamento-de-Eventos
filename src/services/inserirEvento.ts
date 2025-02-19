import { menuGerenciamento, voltar } from "..";
import { conectandoAoBanco } from "../config/configBD";
import { Evento } from "../models/evento";
import { validacaoData } from "../validation/validData";

export async function inserirEvento(evento: Evento): Promise<void> {
    const db = await conectandoAoBanco();
  
    if(!validacaoData(evento.data)) return

    const query = `
        INSERT INTO eventos (nome, data, usuario_id)
        VALUES (?,?,?)
    `
    try {
        await db.run(query, [evento.nome.trim(), evento.data.trim(), evento.usuarioResponsavel, evento.id])
        console.log(`\nEvento registrado.\n`);
        menuGerenciamento()
    } catch (err) {
        console.log(`Erro ao registrar o evento: ${err}`);
        menuGerenciamento()
    } finally {
        await db.close();
    }
}