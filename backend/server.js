import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import exerciseRouter from "./routers/exercisesRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PROT || 5000;

app.use(cors());

//read json form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* function: connect with database
  expect: in console you will get message show
  that you connect successfully or there error
*/
import connectDB from "./db/connectDB.js";
connectDB();

app.get("/", (res, req) => {
  console.log("hi");
});

app.use("/api", exerciseRouter);
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`it's work on http://localhost:${PORT}`));
