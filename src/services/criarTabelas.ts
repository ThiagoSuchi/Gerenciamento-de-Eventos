import { conectandoAoBanco } from "../config/configBD";

export async function criarTabelas(): Promise<void> {

    try {
        const db = await conectandoAoBanco();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                senha TEXT NOT NULL
            )
        `);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS eventos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                data TEXT NOT NULL,
                usuario_id INTEGER NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
            )
        `)

        await db.exec(`
            CREATE TABLE IF NOT EXISTS logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                acao TEXT NOT NULL,
                tabela_afetada TEXT NOT NULL,
                item_afetado INTEGER NOT NULL,
                data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
            )    
        `)
        
        console.log('Tabelas criadas com sucesso.');
        
    } catch (err) {
        console.log('Erro ao criar tabelas: ',err);
    }
}