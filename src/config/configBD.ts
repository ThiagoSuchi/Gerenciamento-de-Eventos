import sqlite3  from "sqlite3";
import { open } from 'sqlite';

export async function conectandoAoBanco() {
     const db = await open({
        filename: './database/eventos.db',
        driver: sqlite3.Database
     })

    return db
}