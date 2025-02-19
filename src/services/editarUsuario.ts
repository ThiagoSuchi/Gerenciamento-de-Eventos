import { voltar } from "..";
import { conectandoAoBanco } from "../config/configBD";
import { validacaoUser } from "../validation/validUsuario";

export async function alterUsuario(id: number, nome: string, email: string, senha: string): Promise<void> {
    const db = await conectandoAoBanco()
    
    const select = `SELECT nome, email, senha FROM usuarios WHERE id = ?`
    const userAtual = await db.get(select, [id])
    
    const novoNome = nome !== "" ? nome : userAtual.nome;
    const novoEmail = email !== "" ? email : userAtual.email;
    const novaSenha = senha !== "" ? senha : userAtual.senha;

    const valid = validacaoUser.safeParse({ nome: novoNome, email: novoEmail, senha: novaSenha });
    
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
        await db.run(query, [novoNome.trim(), novoEmail.trim(), novaSenha.trim(), id])

        console.log(`Perfil alterado com sucesso.`);
        voltar()
    } catch (erro) {
        console.log('Erro ao tentar alterar perfil: ', erro);
    } finally {
        await db.close();
    }
}