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

// Default export
export default router;
