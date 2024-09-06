import express, { Express } from "express";
import errorHandler from "./middleware/error.js";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";

const app = express();

const CORS_OPTION: CorsOptions = {
  origin:  "http://localhost:3000" , // TODO: check for NODE_ENV === "development" leter 
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

dotenv.config();
app.use(cors(CORS_OPTION));


app.use(errorHandler);

export default app;
