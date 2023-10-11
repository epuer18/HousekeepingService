import express from "express";
import {myDB} from "../db/MyDb.js";

const router = express.Router();

// code from class, TODO: rework into usable code
router.get("/services", async (req, res) => {
  const services = await myDB.getServices({"MaxElements": 21});
  res.json(services);
});

router.post("/add", async (req, res) => {
  const service = req.body;
  console.log(req.body)
  myDB.addService(service);
});

router.post("/update", async (req, res) => {
  const service = req.body;
  console.log(req.body)
  myDB.updateRating(service);
});


// end point for sign up

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
