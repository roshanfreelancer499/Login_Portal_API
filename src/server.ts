import express from "express";
import path from "path";
import SwaggerMiddlewareConfig from "./middleware/swagger";
import authRouter from "./routers/auth.router";

const app = express();

app.use("/api/auth", authRouter);

/* Serve swagger.json */
app.get(
  "/swagger.json",
  express.static(path.resolve(process.cwd(), "public"))
);

/* Setup Swagger */
SwaggerMiddlewareConfig.setUp(app);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});