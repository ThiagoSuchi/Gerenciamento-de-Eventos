import { menuGerenciamento, voltar } from "..";
import { conectandoAoBanco } from "../config/configBD";
import { UsuarioLog } from "../logs/UsuarioLog";
import { idUserLogado } from "../validation/validLogin";

// Para admin
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
            const result = await db.get(listarEventId, [id]);

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
            const result = await db.get(listarUserId, [id]);

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

// Para usuário, buscar evento
export async function listarEventoPorNome(nome: string): Promise<void> {
    const db = await conectandoAoBanco()

    const evento = `
        SELECT e.nome, e.data
        FROM eventos e
        INNER JOIN usuarios u on e.usuario_id = u.id
        WHERE e.nome = ?
    `

    try {
        const result = await db.all(evento, [nome])

        if(result) {
            console.log('-----------------------------------------------');
            result.forEach((evento, index) => {
                console.log(`${index + 1} Evento: ${evento.nome}\n  Data: ${evento.data}`);
            })
            console.log('-----------------------------------------------\n');
            voltar()
        } else {
            console.log("Evento não encontrado!");
            voltar()
        }
    } catch (err) {
        console.log("Erro ao fazer a busca do evento: ", err);
        menuGerenciamento()
    } finally {
        db.close()
    }
}

// Para usuário, ver perfil
export async function listarPerfil(id: number = idUserLogado): Promise<void> {
    const db = await conectandoAoBanco()

    const query = `
        SELECT nome, email, senha
        FROM usuarios
        WHERE id = ?
    `

    try {
        const conta = await db.get(query, [id])

        console.log(`\n Meu perfil: \n1. Nome: ${conta.nome}\n2. E-mail: ${conta.email}\n3. Senha: ${conta.senha}`);
    } catch (erro) {
        console.log("Não foi possível abrir seu perfil: ", erro);
    }
}