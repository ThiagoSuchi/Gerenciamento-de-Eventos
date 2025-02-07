# Gerenciamento de Eventos

Este é um sistema simples de gerenciamento de eventos utilizando **Node.js**, **TypeScript** e **SQLite**. Ele permite o cadastro de eventos e usuários, além de registrar logs das ações realizadas no banco de dados.

## 📌 Funcionalidades

- **Gerenciamento de Eventos**
  - Criar um evento
  - Listar todos os eventos
  - Buscar um evento específico
  - Deletar um evento

- **Gerenciamento de Usuários**
  - Cadastrar um novo usuário
  - Listar usuários
  - Buscar um usuário específico
  - Deletar um usuário

- **Registro de Logs**
  - Registrar ações no banco de dados, incluindo inserções, alterações e exclusões
  - Armazenar informações sobre qual usuário executou a ação e em qual data/hora

## 🛠 Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **SQLite** (banco de dados leve e embutido)
- **Zod** (para validação de dados)
- **Bcrypt** (para hash de senhas)
- **SQLite3** (para interação com o banco de dados)

## 🚀 Como Executar o Projeto

### 1️⃣ Instalar as dependências
```bash
npm install
```

### 2️⃣ Criar as tabelas no banco de dados
```bash
npm run setup  # (Caso tenha um script para isso)
```

### 3️⃣ Executar o sistema
```bash
npm start
```

Agora o sistema está pronto para ser utilizado! 🎉

