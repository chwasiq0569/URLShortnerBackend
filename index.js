import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from "./routes/short.js";
import { createShortURL, getShortURL } from './controller/short.js';

const app = express();

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
// app.post("/short", createShortURL);
// app.get("/:shortUrl", getShortURL);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function () {
  console.log("Server started successfully on port: ", port);
});