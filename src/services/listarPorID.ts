import { conectandoAoBanco } from "../config/configBD";

export async function listarUserOuEventoPorID(tabela: 'eventos' | 'usuarios', id: number): Promise<void> {
    const db = await conectandoAoBanco()

    const listarUserId = `
        SELECT nome, email
        FROM usuarios
        WHERE id = ?
    `
    const listarEventId = `
        SELECT e.id, e.nome, e.data, u.nome as Usuário_responsável
        FROM eventos e
        INNER JOIN usuarios u on e.usuario_id = u.id
        WHERE e.id = ?
    `

    if (tabela === 'eventos') {
        try {
            const result = await db.all(listarEventId, [id]);

            if (result.length === 0) {
                console.log(`Evento com ID ${id} não existe.`);
                return
            }

            console.log('Evento encontrado: ', result);

        } catch (erro) {
            console.log('Erro ao listar evento: ', erro);
        } finally {
            await db.close()
        }
        return

    } else if (tabela === 'usuarios') {
        try {
            const result = await db.all(listarUserId, [id]);

            if (result.length === 0) {
                console.log(`Usuário com ID ${id} não existe.`);
                return
            }

            console.log('Usuário encontrado: ', result);

        } catch (erro) {
            console.log('Erro ao listar usuário: ', erro);
        } finally {
            await db.close()
        }
        return
    }
}