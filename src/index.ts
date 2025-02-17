import { criarTabelas } from "./services/criarTabelas";
import { deletarUserOuEvento } from "./services/deletar";
import { deletarTabela } from "./services/deletarTabelas";
import { alterEvento } from "./services/editarEvento";
import { alterUsuario } from "./services/editarUsuario";
import { listarUserOuEventoPorID } from "./services/listarPorID";
import { listarUsuariosOuEventos } from "./services/listarTodos";
import { cadastrarUsuario } from "./utils/cadastrarUsuario";
import { registrarEventos } from "./utils/registrarEvento";


// criarTabelas();
// cadastrarUsuario('Maria Gimenez', 'majuzinha@gmail.com', 'mariazinha123321@#');
// registrarEventos('Festival Literário Dom Bosco', '19/03/2025', 1)
// deletarUserOuEvento('eventos', 3)
// deletarTabela('logs');
// listarUsuariosOuEventos("eventos");
// listarUserOuEventoPorID("eventos", 2)
// alterUsuario(1, 'Gabriel Almeida', 'almeida@gmail.com', 'gabigol33445566@');
// alterEvento(1, 'Festa Junina', '21/10/2025')