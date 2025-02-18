import { conectandoAoBanco } from "../config/configBD";
import { idUserLogado } from "../validation/validLogin";

// Para admin
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

// Para usuário
export async function listarEventoPorUser(id: number = idUserLogado): Promise<void> {
    const db = await conectandoAoBanco()

    const query = `SELECT * FROM eventos WHERE usuario_id = ?`;

    try {
        await db.all(query, [id])
        console.log("Esses são todos eventos que você possuí.");
    } catch (erro) {
        console.log("Erro ao listar eventos: ", erro);
    } finally {
        await db.close()
    }
}