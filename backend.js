import express from "express";
import apiRouter from "./routes/api.js";
import bodyParser  from "body-parser";
import session from "express-session";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Configure express-session
// help from AI to use express-session
// asked helped for saving specific user posts and booking
//NOT SURE IF I NEED SINCE SAVING DATA IS NOT WORKING
app.use(
    session({
      secret: "your_secret_key", // replace 'your_secret_key' with a strong unique secret string
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      // Note: Use secure: true only if you're using https. For development, you can leave it as false.
    })
  );

app.use(express.static("frontend"));
app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
