import { conectandoAoBanco } from "../config/configBD";

export async function alterEvento(id: number, nome: string, data: string): Promise<void> {
    const db = await conectandoAoBanco()

    const query = `
        UPDATE eventos
        SET nome = ?, data = ?
        WHERE id = ?
   `;

    try {
        const result = await db.run(query, [nome, data, id])

        if (result.changes === 0) {
            console.log('O evento não existe, para alterar o evento escolha um existente.');
            return;
        }

        console.log(`Evento de ID ${id} alterado com sucesso.`);
    } catch (erro) {
        console.log('Erro ao tentar alterar evento: ', erro);
    } finally {
        await db.close();
    }
}