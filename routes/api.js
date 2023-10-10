import express from "express";
import { myDB } from "../db/MyDb.js";

const router = express.Router();
const DB_URL = "mongodb://localhost:3000";
const DB_NAME = "housekeepingService";

// code from class, TODO: rework into usable code
router.get("/cinco", async (req, res) => {
  console.log("should return prompts");

  console.log("before");
  //gets prompts from function
  const prompts = await myDB.getPrompts();
  console.log("after");
  //res.json(prompts);
});

// trying to connect post form with saving to mangodb
// router.post("/submit-form", async (req, res) => {
//   let client;
//   try {
//     client = await MongoClient.connect(DB_URL, { useUnifiedTopology: true });
//     const db = client.db(DB_NAME);
//     const collection = db.collection("users");

//     const result = await collection.insertOne({
//       name: req.body.name,
//       email: req.body.email,
//     });

//     const fs = require("fs");
//     fs.writeFileSync("output.json", JSON.stringify(req.body));

//     res.send("Data saved!");
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   } finally {
//     if (client) {
//       client.close();
//     }
//   }
// });

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const result = await myDB.registerUser({ username, email, password });
  if (result.success) {
    res.redirect("/actionPage.html");
  } else {
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await myDB.authenticateUser({ username, password });
  if (result.success) {
    res.redirect("/actionPage.html");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Default export
export default router;
