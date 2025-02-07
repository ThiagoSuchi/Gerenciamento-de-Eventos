import { conectandoAoBanco } from "../config/configBD";

export async function listarUsuariosOuEventos(tabela: 'eventos' | 'usuarios'): Promise<void> {
    const db = await conectandoAoBanco()

    const listUsers = `SELECT * FROM usuarios`;
    const listEvent = `SELECT * FROM eventos`;

    if (tabela === "usuarios") {
        try {
            const result = await db.all(listUsers)
            console.log('Usuários encontrados: ', result);
        } catch (erro) {
            console.log('Erro ao listar usuários: ', erro);
        } finally {
            await db.close();
        }
    } else if (tabela === "eventos") {
        try {
            const result = await db.all(listEvent)
            console.log('Eventos encontrados: ', result);
        } catch (erro) {
            console.log('Erro ao listar os eventos: ', erro);
        } finally {
            await db.close();
        }
    }

}