import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import http from "http";
import connectDB from "./db/connection_1.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { socketConnection } from "./utilities/index.js";

connectDB();
const app = express();
const httpServer = http.createServer(app);

socketConnection(httpServer);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_DOMAIN || "https://chat-app-wheat-phi.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to home </h1>`);
  // res.json(process.env.MONGODB_URl);
});

//middlewares
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import messageRouter from "./routes/message.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use(errorMiddleware);

//listen
httpServer.listen(PORT, () =>
  console.log(`server running at http://localhost:${PORT}`)
);
