import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import serverless from "serverless-http";

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

import { ChatController } from "./controllers/index.js";

app.use("/api/chat", ChatController);

app.get("/ping", (req, res) => {
  res.status(200).send({ status: "ok" });
});

const PORT = process.env.PORT || 1112;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Wrap the app with serverless-http
export const handler = serverless(app);