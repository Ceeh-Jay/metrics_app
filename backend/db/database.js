import sqlite3 from "sqlite3";
import fs from "fs";
import path, { __dirname } from "path";

const initializeDatabase = () => {

    const db = new sqlite3.Database(":memory:");

    const schemaPath = path.join(__dirname, '../sql_schema/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);

    return db;
};

export { initializeDatabase };
