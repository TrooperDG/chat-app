import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to home </h1>");
});
app.use("/user", userRouter);

app.listen(PORT, () => console.log("server running at http://localhost:5000"));
