import { Router } from "express";
import { campaignSchema } from "../validation/campaignValidation.js";

const router = Router();

export default (db) => {
  // API endpoint to receive and store campaign data (override existing data)
  router.post("/", (req, res) => {
    //Use Joi validation for request body
    const { error } = campaignSchema.validate(req.body);

    if (error) {
      // Handle validation errors by sending a 400 Bad Request response
      res.status(400).json({ error: error.details.map((err) => err.message) });
      return;
    }

    const { impressions, clicks, conversions, spend } = req.body;

    // Check if there's data in the campaigns table
    db.get("SELECT COUNT(*) AS count FROM campaigns", (countError, result) => {
      if (countError) {
        const errorText = countError.message.replace("SQLITE_CONSTRAINT: ", "");
        res.status(500).json({ error: errorText });
      } else {
        const rowCount = result.count;

        if (rowCount > 0) {
          // Remove existing data
          db.run("DELETE FROM campaigns", (deleteError) => {
            if (deleteError) {
              const errorText = deleteError.message.replace(
                "SQLITE_CONSTRAINT: ",
                "",
              ); // Get the error message from the SQLite error object and add a little formatting
              res.status(500).json({ error: errorText });
            } else {
              // Insert the new data

              db.run(
                "INSERT INTO campaigns (impressions, clicks, conversions, spend) VALUES (?, ?, ?, ?)",
                [impressions, clicks, conversions, spend],
                (insertError) => {
                  if (insertError) {
                    const errorText = insertError.message.replace(
                      "SQLITE_CONSTRAINT: ",
                      "",
                    );
                    res.status(500).json({ error: errorText });
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
            "INSERT INTO campaigns (impressions, clicks, conversions, spend) VALUES (?, ?, ?, ?)",
            [impressions, clicks, conversions, spend],
            (insertError) => {
              if (insertError) {
                const errorText = insertError.message.replace(
                  "SQLITE_CONSTRAINT: ",
                  "",
                );
                res.status(500).json({ error: errorText });
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

  router.get("/", (_req, res) => {
    // Check if there are any records in the campaigns table
    db.get("SELECT COUNT(*) AS count FROM campaigns", (countError, result) => {
      if (countError) {
        const errorText = countError.message.replace("SQLITE_CONSTRAINT: ", "");
        res.status(500).json({ error: errorText });
      } else {
        const rowCount = result.count;

        if (rowCount > 0) {
          // If there are records, fetch and return them
          db.all("SELECT * FROM campaigns", (err, rows) => {
            if (err) {
              const errorText = err.message.replace("SQLITE_CONSTRAINT: ", "");
              res.status(500).json({ error: errorText });
            } else {
              res.status(200).json(rows);
            }
          });
        } else {
          // If there are no records, return a message
          res.status(200).json({ message: "No campaign data at the moment. " });
        }
      }
    });
  });

  return router;
};
