import { Server } from "socket.io";
import User from "../models/user.model.js";

let io;
const socketUserMap = new Map();

export const socketConnection = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        process.env.CLIENT_DOMAIN || "https://chat-app-wheat-phi.vercel.app",
      ],
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (!userId) return;

    //getting other online users---------------
    socketUserMap.set(userId, socket.id);
    io.emit("onlineUsers", Array.from(socketUserMap.keys()));

    // user is typing or not --------------------------
    socket.on("typingStatus", ({ to, typing }) => {
      io.to(getSocketId(to)).emit("typingStatus", {
        from: userId,
        typing,
      });
    });

    // disconnecting socket ---------------------------
    socket.on("disconnect", async () => {
      socketUserMap.delete(userId);
      io.emit("goneOffline", userId);
      io.emit("onlineUsers", Array.from(socketUserMap.keys()));

      try {
        await User.findByIdAndUpdate(userId, {
          lastSeen: new Date(),
        });
      } catch (err) {
        console.error("Failed to update lastSeen:", err);
      }
    });

    // console.log(Object.keys(socketUserMap));
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};
export const getSocketId = (userId) => {
  return socketUserMap.get(userId);
};
