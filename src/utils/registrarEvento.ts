import { Evento } from "../models/evento"
import { inserirEvento } from "../services/inserirEvento"

export function registrarEventos(nome: string, data: string, responsavel: number): void {
    const novoEvento: Evento = {
        nome: nome,
        data: data,
        usuarioResponsavel: responsavel
    }

    inserirEvento(novoEvento)
}