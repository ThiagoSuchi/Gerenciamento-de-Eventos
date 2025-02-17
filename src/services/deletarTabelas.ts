import { conectandoAoBanco } from "../config/configBD";

export async function deletarTabela(nomeTab: string): Promise<void> {
    const db = await conectandoAoBanco()

    try {
        await db.run(`DROP TABLE IF EXISTS ${nomeTab}`)
        console.log(`Tabela ${nomeTab} deletada com sucesso!`);
    } catch (erro) {
        console.log('Erro ao deletar tabela: ', erro);
    } finally {
        await db.close()
    }
}