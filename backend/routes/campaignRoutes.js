import { Router } from "express";
import { initializeDatabase } from "../db/database.js";

const router = Router();
const db = initializeDatabase();

// API endpoint to receive and store campaign data (override existing data)
router.post("/", (req, res) => {
  const { name, impressions, clicks, conversions, spend } = req.body;

  // Check if there's data in the campaigns table
  db.get("SELECT COUNT(*) AS count FROM campaigns", (countError, result) => {
    if (countError) {
      res
        .status(500)
        .json({ error: "Error making initial data check in the database." });
    } else {
      const rowCount = result.count;

      if (rowCount > 0) {
        // Remove existing data
        db.run("DELETE FROM campaigns", (deleteError) => {
          if (deleteError) {
            res
              .status(500)
              .json({ error: "Error deleting existing data from database." });
          } else {
            // Insert the new data
            db.run(
              "INSERT INTO campaigns (name, impressions, clicks, conversions, spend) VALUES (?, ?, ?, ?, ?)",
              [name, impressions, clicks, conversions, spend],
              (insertError) => {
                if (insertError) {
                  res
                    .status(500)
                    .json({ error: "Error storing campaign data." });
                } else {
                  res
                    .status(200)
                    .json({ message: "Campaign data stored successfully." });
                }
              },
            );
          }
        });
      } else {
        // If there's no data, simply insert the new data
        db.run(
          "INSERT INTO campaigns (name, impressions, clicks, conversions, spend) VALUES (?, ?, ?, ?, ?)",
          [name, impressions, clicks, conversions, spend],
          (insertError) => {
            if (insertError) {
              res.status(500).json({
                error:
                  "Error storing campaign data. Ensure you have provided valid data",
              });
            } else {
              res
                .status(200)
                .json({ message: "Campaign data stored successfully." });
            }
          },
        );
      }
    }
  });
});

//API endpoint to retrieve stored data
router.get("/", (_req, res) => {
  db.all("SELECT * FROM campaigns", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Error retreiving campaign data." });
    } else {
      res.status(200).json(rows);
    }
  });
});

export default router;
