import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import connectDB from "./db/connection_1.db.js";
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

connectDB();
const app = express();
app.use(express.json());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to home </h1>`);
  // res.json(process.env.MONGODB_URl);
});
app.use("/user", userRouter);
app.use(errorMiddleware);

app.listen(PORT, () => console.log("server running at http://localhost:5000"));
