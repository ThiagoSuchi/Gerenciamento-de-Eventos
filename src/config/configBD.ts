import sqlite3  from "sqlite3";
import { open, Database } from 'sqlite';

export async function conectandoAoBanco(): Promise<Database> {
     const db = await open({
        filename: './database/eventos.db',
        driver: sqlite3.Database
     })
     
   return db
}
