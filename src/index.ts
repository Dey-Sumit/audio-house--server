import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "@utils/connectDB";

import { notFound, errorHandler } from "@middlewares/error.middleware";
import log from "@libs/logger";
import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.set("trust proxy", 1); // trust first proxy

app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  // connectDB(); // asyncly connected to db
  log.info(`Server is Running on ${PORT}`);
});
