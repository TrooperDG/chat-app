import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import connectDB from "./db/connection_1.db.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to home </h1>`);
  // res.json(process.env.MONGODB_URl);
});

//middlewares
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import messageRouter from "./routes/message.route.js";

app.use("/user", userRouter);
app.use("/message", messageRouter);
app.use(errorMiddleware);

app.listen(PORT, () => console.log("server running at http://localhost:5000"));
