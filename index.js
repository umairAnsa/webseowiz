
import  "dotenv/config";


import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

import cardsRouter from "./routes/cards.js";
import resturentRouter from "./routes/resturent.js";
import domainRouter from "./routes/domains.js";
import userRouter from "./routes/user.js";
app.use(bodyParser.json());
app.use(cookieParser());
// middlewares
app.use("/api", cardsRouter);
app.use("/api", resturentRouter);
app.use("/api", domainRouter);
app.use("/api", userRouter);

app.listen(process.env.PORT, () => {
  
  console.log(`project is running on ${process.env.DB_NAME} `, process.env.PORT);
});
