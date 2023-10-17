import sqlite3 from "sqlite3";
import { readFileSync } from "fs";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initializeDatabase = () => {

    const db = new sqlite3.Database(":memory:");

    const schemaPath = path.join(__dirname, '../sql_schema/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    db.exec(schema);

    return db;
};

export { initializeDatabase };
