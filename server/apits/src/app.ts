import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.port || 4000;

const app = express();
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
// app.options("*", cors());

app.get("/", (req, res, next) => {
  res.json({
    sucess: true,
    hello: true,
    reactive: true,
  });
});

app.get("/api", (req, res, next) => {
  res.json({
    sucess: true,
    hello: true,
    api: true,
  });
});

app.get("/api/signin-apple", (req, res, next) => {
  res.json({
    singinapple: true,
  });
});

app.post("/api/signin-apple", (req, res, next) => {
  res.json({
    req: req,
  });
});

app.listen(port, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${port}
  ################################################
`);
});
