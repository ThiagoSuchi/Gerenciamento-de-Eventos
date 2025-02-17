import { criarTabelas } from "./services/criarTabelas";
import { deletarUserOuEvento } from "./services/deletar";
import { deletarTabela } from "./services/deletarTabelas";
import { alterEvento } from "./services/editarEvento";
import { alterUsuario } from "./services/editarUsuario";
import { listarUserOuEventoPorID } from "./services/listarPorID";
import { listarUsuariosOuEventos } from "./services/listarTodos";
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

async function menuLoginRegistra() {
    console.log("Olá, para prosseguir faça seu login.");
    console.log("[1] Cadastrar");
    console.log("[2] Login");

    const opcao = await pergunta("Escolha uma opção: ")

    if (opcao === "1") {
        const nome = await pergunta("Digite seu nome: ");
        const email = await pergunta("Digite seu e-mail: ");
        const senha = await pergunta("Digite sua senha: ");
        cadastrarUsuario(nome, email, senha)
        console.log(`Login realizado com sucesso! seja bem vindo(a) ${nome}.`);
        listaGerenciamento()

    } else if (opcao === "2") {
        const nome = await pergunta("Digite seu nome: ");
        const senha = await pergunta("Digite sua senha: ");
        validLogin(nome, senha)
        console.log(`\n ------- Login realizado com sucesso! seja bem vindo(a) ${nome} ------- \n`);
        listaGerenciamento()

    } else {
        console.log("Opção inválida!");
    }
}

async function listaGerenciamento() {
    console.log("Aqui você gerencia seus eventos: ");
    console.log("[1] Registrar evento ");
    console.log("[2] Deletar evento ");
    console.log("[3] Listar eventos ");
    console.log("[4] Listar evento por ID ");
    console.log("[5] Alterar evento ");
    console.log("[6] Editar perfil ");
    const opcao = await pergunta("Oque deseja faazer? ")

    if(opcao === "1") {
        console.log("blz chegou aqui, agora registre seu evento");
    }
}


menuLoginRegistra()

// criarTabelas();
// registrarEventos('Festival Literário Dom Bosco', '19/03/2025', 1)
// deletarUserOuEvento('eventos', 3)
// deletarTabela('logs');
// listarUsuariosOuEventos("eventos");
// listarUserOuEventoPorID("eventos", 2)
// alterUsuario(1, 'Gabriel Almeida', 'almeida@gmail.com', 'gabigol33445566@');
// alterEvento(1, 'Festa Junina', '21/10/2025')

