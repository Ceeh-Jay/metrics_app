import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors";

const port = process.env.PORT || 4000;

//App instance
const app = express();

//configure middleware
app.use(bodyParser.json());
app.use(cors());


//Start server
app.listen(port, ()=>{
    console.log(`Server is running on port${port}`);
})