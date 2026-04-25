import express from "express";
import path from "path";
import SwaggerMiddlewareConfig from "./middleware/swagger";
import authRouter from "./routers/auth.router";
import dbConfig from "./config/db.config";
import { AuthMiddleware } from "./middleware/auth.middleware";
import mainRouter from "./routers/main.router";

const app = express();

app.use(express.json())
app.use(express.static("public"));
SwaggerMiddlewareConfig.setUp(app);

/* Serve swagger.json */
app.get(
  "/swagger.json",
  express.static(path.resolve(process.cwd(), "public"))
);

app.use("/api/auth", authRouter);
app.use("/api", AuthMiddleware.setup(), mainRouter);


/* Setup Swagger */

dbConfig.initialize().then(() => {
  app.listen(8000, () => {
    console.log("Server running on port 8000");
  });
}).catch((err) => {
  console.log('Failed to initialize the db', err);
});