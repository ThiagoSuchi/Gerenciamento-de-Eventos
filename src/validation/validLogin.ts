import { conectandoAoBanco } from "../config/configBD";

export let idUserLogado: number;

async function buscarUser(nome: string) {
    const db = await conectandoAoBanco()
    const query = `SELECT * FROM usuarios WHERE nome = ?`
    const result = await db.get(query, [nome])

    idUserLogado = result.id
    return result;
}

export async function validLogin(nome: string, senha: string): Promise<boolean> {
    const usuario = await buscarUser(nome)

    if(!usuario) {
        console.log("Nome incorreto, verifique o nome correto e tente novamente.");
        return false
    }

    if(usuario.senha !== senha) {
        console.log("Senha inválida, tente novamente.");
        return false
    }
    
    return true
}