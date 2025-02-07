import { Usuarios } from "../models/usuarios";
import { inserirUsuario } from "../services/inserirUsuario";

export function cadastrarUsuario(nome: string, email: string, senha: string): void {
    const novoUsuario: Usuarios = {
        nome: nome,
        email: email,
        senha: senha
    }

    inserirUsuario(novoUsuario)
}