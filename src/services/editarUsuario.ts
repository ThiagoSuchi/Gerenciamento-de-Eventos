import { conectandoAoBanco } from "../config/configBD";
import { validacao } from "../utils/validUsuario";
import { usuarioExistente } from "../utils/verificacao";

export async function alterUsuario(id: number, nome: string, email: string, senha: string): Promise<void> {
    const db = await conectandoAoBanco()
    const valid = validacao.safeParse({ nome, email, senha });

    if(await usuarioExistente(nome, email)) {
        console.log('Nenhuma alteração foi feita neste usuário, pois seu nome ou email ja são cadastrados');
        return
    }

    if (!valid.success) {
        console.log('Erro na validação: ', valid.error.format());
        return;
    }

    const query = `
        UPDATE usuarios
        SET nome = ?, email = ?, senha = ?
        WHERE id = ?
   `;

    try {
        const result = await db.run(query, [nome, email, senha, id])
        
        if (result.changes === 0) {
            console.log('Este usuário não existe, para alterar escolha um usuário existente.');
            return;
        }
        
        await db.run(`INSERT INTO logs(acao, tabela_afetada, item_afetado) VALUES(?,?,?)`, ['update', 'usuarios', id]);

        console.log(`Usuário de ID ${id} alterado com sucesso.`);
    } catch (erro) {
        console.log('Erro ao tentar alterar usuário: ', erro);
    } finally {
        await db.close();
    }
}