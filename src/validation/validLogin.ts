import { conectandoAoBanco } from "../config/configBD";

async function buscarUser(nome: string) {
    const db = await conectandoAoBanco()
    return db.get(`SELECT * FROM usuarios WHERE nome = ?`, nome)
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