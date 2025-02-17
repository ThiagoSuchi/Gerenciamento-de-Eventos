import { conectandoAoBanco } from "../config/configBD";
import { Evento } from "../models/evento";
import { validacaoData } from "../validation/validData";
import { validacaoEvent } from "../validation/validEvent";

export async function inserirEvento(evento: Evento): Promise<void> {
    const db = await conectandoAoBanco();
    const valid = validacaoEvent.safeParse(evento.nome)

    if(!valid.success) {
        console.log('Erro na validação do nome: ', valid.error.format());
        return
    }

    if(!validacaoData(evento.data)) return

    const query = `
        INSERT INTO eventos (nome, data, usuario_id)
        VALUES (?,?,?)
    `
    try {
        await db.run(query, [evento.nome, evento.data, evento.usuarioResponsavel, evento.id])
        console.log(`Evento registrado.`);
    } catch (err) {
        console.log(`Erro ao registrar o evento: ${err}`);
    } finally {
        await db.close();
    }
}