import { conectandoAoBanco } from "../config/configBD";
import { Usuarios } from "../models/usuarios";
import { validacao } from "../utils/validUsuario";
import { usuarioExistente } from "../utils/verificacao";

export async function inserirUsuario(usuario: Usuarios): Promise<void> {
    const {nome, email, senha} = usuario;
    const valid = validacao.safeParse({nome, email, senha});
    const db = await conectandoAoBanco();
    
    if(await usuarioExistente(usuario.nome, usuario.email)) {
        console.log('Este usuário ja está cadastrado.');
        return
    }

    if(!valid.success) {
        console.log('Erro na validação: ', valid.error.format());
        return;
    }

    const query = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?,?,?)
    `
    try {
        await db.run(query, [usuario.nome, usuario.email, usuario.senha, usuario.id])
        console.log(`Usuário cadastrado com sucesso.`);
    } catch (err) {
        console.log(`Erro ao cadastrar um novo usuário: ${err}`);
    } finally {
        await db.close();
    }
}