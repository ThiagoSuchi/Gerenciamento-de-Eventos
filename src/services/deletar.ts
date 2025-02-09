import { conectandoAoBanco } from "../config/configBD"

export async function deletarUserOuEvento(tabela: 'eventos' | 'usuarios', id: number): Promise<void> {
    const db = await conectandoAoBanco()

    const deletEvent = `
        DELETE FROM eventos
        WHERE id = ?
    `
    const deletUsuario = `
        DELETE FROM usuarios
        WHERE id = ?
    `
    if (tabela === 'eventos') {
        try {
            const result = await db.run(deletEvent, [id])

            if (result.changes === 0) {
                console.log(`Evento com ID ${id} não existe.`);
                return
            }

            await db.run(`INSERT INTO logs(acao, tabela_afetada, item_afetado) VALUES(?,?,?)`, ['delete', tabela, id]);
            await db.run('DELETE FROM sqlite_sequence WHERE name = "eventos"');

            console.log(`Evento de ID ${result.lastID} deletado com sucesso.`);

        } catch (erro) {
            console.log('Erro ao deletar evento: ', erro);
        } finally {
            await db.close()
        }
        return

    } else if (tabela === 'usuarios') {
        try {
            const result = await db.run(deletUsuario, [id])

            if (result.changes === 0) {
                console.log(`Usuário com ID ${id} não existe.`);
                return
            }

            await db.run(`INSERT INTO logs(acao, tabela_afetada, item_afetado) VALUES(?,?,?)`, ['delete', tabela, id]);
            await db.run('DELETE FROM sqlite_sequence WHERE name = "usuarios"');

            console.log(`Usuario de ID ${result.lastID} deletado com sucesso.`);

        } catch (erro) {
            console.log('Erro ao deletar usuário: ', erro);
        } finally {
            await db.close()
        }
        return
    }
}