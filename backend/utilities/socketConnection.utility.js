import { Server } from "socket.io";
let io;
const socketUserMap = new Map();

export const socketConnection = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_DOMAIN,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (!userId) return;

    socketUserMap.set(userId, socket.id);
    // console.log(Array.from(socketUserMap.keys()));
    io.emit("onlineUsers", Array.from(socketUserMap.keys()));

    socket.on("disconnect", () => {
      delete socketUserMap[userId];
      io.emit("onlineUsers", Array.from(socketUserMap.keys()));
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
