import { voltar } from "..";
import { conectandoAoBanco } from "../config/configBD";

export async function alterEvento(id: number, nome: string, data: string): Promise<void> {
    const db = await conectandoAoBanco()

    const selectInfo = `SELECT nome, data FROM eventos WHERE id = ?`;
    const eventAtual = await db.get(selectInfo, [id])

    const novoNome = nome.trim() !== "" ? nome : eventAtual.nome;
    const novaData = nome.trim() !== "" ? data : eventAtual.data;

    const query = `
        UPDATE eventos
        SET nome = ?, data = ?
        WHERE id = ?
   `;

    try {
        const result = await db.run(query, [novoNome, novaData, id])
        
        if (result.changes === 0) {
            console.log('O evento não existe, para alterar o evento escolha um existente.');
            return;
        }

        console.log(`Evento alterado com sucesso.`);
        voltar()
    } catch (erro) {
        console.log('Erro ao tentar alterar evento: ', erro);
    } finally {
        await db.close();
    }
}
