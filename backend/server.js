import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { initializeDatabase } from "./db/database.js";
import campaignRoutes from "./routes/campaignRoutes.js";

const port = process.env.PORT || 4000;

//App instance
const app = express();

//configure middleware
app.use(bodyParser.json());
app.use(cors());

//Initialize the SQLite database
const db = initializeDatabase();

//Routes for campaigns
app.use("/api/campaigns", campaignRoutes(db));

//Start server
app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});
