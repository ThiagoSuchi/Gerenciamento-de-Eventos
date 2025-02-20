import { conectandoAoBanco } from "../config/configBD";
import { Usuarios } from "../models/usuarios";
import { validacaoUser } from "../validation/validUsuario";
import { usuarioExistente } from "../utils/verificacao";
import { UsuarioLog } from "../logs/UsuarioLog";
import { idUserLogado } from "../validation/validLogin";


export async function inserirUsuario(usuario: Usuarios): Promise<void> {
    const {id, nome, email, senha} = usuario;
    const valid = validacaoUser.safeParse({nome, email, senha});
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
        await db.run(query, [usuario.nome.trim(), usuario.email.trim(), usuario.senha.trim(), usuario.id])

        UsuarioLog.registrarLog(idUserLogado, id, "Usuários", "INSERT")   
    } catch (err) {
        console.log(`Erro ao cadastrar um novo usuário: ${err}`);
    } finally {
        await db.close();
    }
}