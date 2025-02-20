import { menuGerenciamento, voltar } from "..";
import { conectandoAoBanco } from "../config/configBD";
import { UsuarioLog } from "../logs/UsuarioLog";
import { validacaoData } from "../validation/validData";
import { idUserLogado } from "../validation/validLogin";

export async function alterEvento(id: number, nome: string, data: string): Promise<void> {
    const db = await conectandoAoBanco()

    const selectInfo = `SELECT nome, data FROM eventos WHERE id = ?`;
    const eventAtual = await db.get(selectInfo, [id])

    const novoNome = nome.trim() !== "" ? nome : eventAtual.nome;
    const novaData = data.trim() !== "" ? data : eventAtual.data;

    if(!validacaoData(novaData) && data !== "") return

    const query = `
        UPDATE eventos
        SET nome = ?, data = ?
        WHERE id = ?
   `;

    try {
        if(novoNome === "" && novaData === ""){
            console.log('Nenhuma alteração foi feita em seus eventos');
            menuGerenciamento()
            return
        }

        const result = await db.run(query, [novoNome, novaData, id])
        
        if (result.changes === 0) {
            console.log('O evento não existe, para alterar o evento escolha um existente.');
            return;
        }

        UsuarioLog.registrarLog(idUserLogado, id, "Eventos", "UPDATE")
        console.log(`Evento alterado com sucesso.`);
        voltar()
    } catch (erro) {
        console.log('Erro ao tentar alterar evento: ', erro);
    } finally {
        await db.close();
    }
}
