import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connection } from "./db.js";
import { router as usersRouter } from "./routes/users.js";

const app = express();

// database connection
if (process.env.NODE_ENV !== "test") {
  connection();
}

// middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes
app.use("/api/users", usersRouter);

export default app;
