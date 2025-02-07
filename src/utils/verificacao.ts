import { conectandoAoBanco } from "../config/configBD";

export async function usuarioExistente(nome: string, email: string): Promise<boolean> {
    const db = await conectandoAoBanco()

    const usuarioExiste = 
    await db.get(`
        SELECT * FROM usuarios 
        WHERE nome = ? 
        AND email = ?
    `, [nome, email])

    if(usuarioExiste) {
        return true
    }

    return false
}