import express from "express";
import path from "path";
import SwaggerMiddlewareConfig from "./middleware/swagger.ts";

const app = express();

app.use(express.json());

/* Serve swagger.json */
app.get("/swagger.json", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "public/swagger.json"));
});

/* Setup swagger BEFORE routes */
SwaggerMiddlewareConfig.setUp(app);

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
