import { menuGerenciamento, voltar } from "..";
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
export async function listarEventoPorUserLogado(id: number = idUserLogado): Promise<void> {
    const db = await conectandoAoBanco()

    const query = `SELECT * FROM eventos WHERE usuario_id = ?`;

    try {
        const result = await db.all(query, [id])

        console.log("\n------ Esses são todos os seus eventos ------\n");
        
        if (result.length > 0) {
            result.forEach((evento, index) => {
                console.log(`${index + 1} - Evento: ${evento.nome} \n    Data: ${evento.data}`);
            });
        }
        console.log('---------------------------------------------');
        voltar()
    } catch (erro) {
        console.log("Erro ao listar eventos: ", erro);
        menuGerenciamento()
    } finally {
        await db.close()
    }
}