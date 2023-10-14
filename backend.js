import express from "express";
import apiRouter from "./routes/api.js";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("frontend"));
app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
