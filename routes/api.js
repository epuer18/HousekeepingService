import express from "express";
import { myDB } from "../db/MyDb.js";

const router = express.Router();
const DB_URL = "mongodb://localhost:3000";
const DB_NAME = "housekeepingService";

// code from class, TODO: rework into usable code
router.get("/services", async (req, res) => {
  const services = await myDB.getServices({ MaxElements: 21 });
  res.json(services);
});

// router.post("/add", async (req, res) => {
//   const service = req.body;
//   console.log(req.body);
//   myDB.addService(service);
// });
router.post("/add", async (req, res) => {
  try {
    const service = req.body;
    console.log(req.body);
    const serviceId = await myDB.addService(service);
    res
      .status(201)
      .json({ message: "Service added successfully", id: serviceId });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/update", async (req, res) => {
  const service = req.body;
  console.log(req.body);
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
// end point for login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await myDB.authenticateUser({ username, password });
  if (result.success) {
    res.redirect("/actionPage.html");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// end point for deleting post
router.delete("/delete/:id", async (req, res) => {
  console.log("Received delete request for ID:", req.params.id);
  const serviceId = req.params.id;

  try {
    const result = await myDB.deleteService(serviceId);

    if (result.deletedCount === 1) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: "Service not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete service" });
  }
});

// Default export
export default router;
