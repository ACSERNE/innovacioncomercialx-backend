let io = null;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log('Cliente conectado:', socket.id);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) throw new Error("Socket.IO no inicializado");
    return io;
  }
};
