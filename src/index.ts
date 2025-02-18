import { criarTabelas } from "./services/criarTabelas";
import { deletarUserOuEvento } from "./services/deletar";
import { deletarTabela } from "./services/deletarTabelas";
import { alterEvento } from "./services/editarEvento";
import { alterUsuario } from "./services/editarUsuario";
import { listarEventoPorNome, listarUserOuEventoPorID } from "./services/listarPorID";
import { listarEventoPorUserLogado, listarUsuariosOuEventos } from "./services/listarTodos";
import { cadastrarUsuario } from "./utils/cadastrarUsuario";
import { registrarEventos } from "./utils/registrarEvento";
import { validLogin } from "./validation/validLogin";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function pergunta(prgnt: string): Promise<string> {
    return new Promise((resolve) => rl.question(prgnt, resolve));
}

async function menuLoginOuRegistra() {
    console.log("---- OLÁ, PARA PROSSEGUIR FAÇA SEU LOGIN OU CADASTRE-SE ----");
    console.log("[1] Cadastrar");
    console.log("[2] Login");

    const opcao = await pergunta("Escolha uma opção: ")

    if (opcao === "1") {
        const nome = await pergunta("Digite seu nome: ");
        const email = await pergunta("Digite seu e-mail: ");
        const senha = await pergunta("Digite sua senha: ");
        cadastrarUsuario(nome, email, senha)
        console.log(`\n ------- Cadastro realizado com sucesso! seja bem vindo(a) ${nome} ------- \n`);
        menuGerenciamento()

    } else if (opcao === "2") {
        const nome = await pergunta("Digite seu nome: ");
        const senha = await pergunta("Digite sua senha: ");
        validLogin(nome, senha)
        console.log(`\n ------- Login realizado com sucesso! Bem vindo(a) de volta ${nome} ------- \n`);
        menuGerenciamento()

    } else {
        console.log("\n!!!!Opção inválida!!!!\n");
        menuLoginOuRegistra()
    }
}

// Lista de gerenciamento para o tipo Usuário
export async function menuGerenciamento() {
    console.log("Aqui você gerencia seus eventos: ");
    console.log("[1] Registrar evento ");
    console.log("[2] Listar todos os eventos ");
    console.log("[3] Buscar evento ");
    console.log("[4] Editar evento ");
    console.log("[5] Deletar evento ");
    console.log("[6] Editar meu perfil ");
    console.log("[7] Sair ");
    const opcao = await pergunta("\nOque você deseja fazer? ")

    if (opcao === "1") {
        const nomeEvent = await pergunta("Qual é o evento: ")
        const dataEvent = await pergunta("Qual é a data do evento: ")
        registrarEventos(nomeEvent, dataEvent)
    } else if (opcao === "2") {
        await listarEventoPorUserLogado()
    } else if (opcao === "3") {
        const nomeEvent = await pergunta("Qual é o evento: ")
        console.log();
        await listarEventoPorNome(nomeEvent)
    }else if (opcao === "4") {
        await listarEventoPorUserLogado()
    }else if (opcao === "5") {
        await listarEventoPorUserLogado()
    }else if (opcao === "6") {
        await listarEventoPorUserLogado()
    }else if (opcao === "7") {
        rl.close()
    }
    
}

export async function voltar(): Promise<void> {
    const voltarAoMenu = await pergunta("Voltar?[sim]: ")
    console.log();

    if(voltarAoMenu === 'Sim' || voltarAoMenu === 'S' || voltarAoMenu === 'sim' || voltarAoMenu === 's' ) {
        menuGerenciamento()
    } else {
        voltar()
    }
}

menuLoginOuRegistra()

// criarTabelas();
// registrarEventos('Festival Literário Dom Bosco', '19/03/2025', 1)
// deletarUserOuEvento('eventos', 3)
// deletarTabela('logs');
// listarUsuariosOuEventos("eventos");
// listarUserOuEventoPorID("eventos", 2)
// alterUsuario(1, 'Gabriel Almeida', 'almeida@gmail.com', 'gabigol33445566@');
// alterEvento(1, 'Festa Junina', '21/10/2025')

