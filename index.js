import express, { urlencoded, json } from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import sequelize from "./database.js";
import "./associations.js";

import userRoute from "./routes/user.js";
import viewedRoute from "./routes/viewed.js";
import favoriteRoute from "./routes/favorite.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/user", userRoute);
app.use("/viewed", viewedRoute);
app.use("/favorite", favoriteRoute);

const server = http.createServer(app);

const Port = process.env.PORT || 8081;
server.listen(Port, () => {
  console.log(`Listening on ${Port}`);
});
