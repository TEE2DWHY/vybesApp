import { io } from "socket.io-client";

let socket = null;

const connectSocket = (userId) => {
  if (!socket || !socket.connected) {
    // Only initialize the socket if it's not already initialized or if it's disconnected
    socket = io("https://vybesapi.onrender.com");

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("addNewUser ", userId); // Emit user ID to server on connection
      console.log("Emitted addNewUser  with ID:", userId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }
  return socket; // Always return the current socket
};

const disconnectSocket = () => {
  if (socket) {
    // Only disconnect if socket is initialized
    socket.disconnect();
    socket = null; // Set socket back to null after disconnect
    console.log("Socket disconnected.");
  }
};

export { connectSocket, disconnectSocket };
