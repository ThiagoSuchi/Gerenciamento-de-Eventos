import { Evento } from "../models/evento"
import { inserirEvento } from "../services/inserirEvento"
import { idUserLogado } from "../validation/validLogin"

export function registrarEventos(nome: string, data: string, responsavel: number = idUserLogado): void {
    const novoEvento: Evento = {
        nome: nome,
        data: data,
        usuarioResponsavel: responsavel
    }

    inserirEvento(novoEvento)
}