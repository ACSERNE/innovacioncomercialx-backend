let io = null;

module.exports = {
  init(server) {
    io = require("socket.io")(server, {
      cors: { origin: "*" }
    });

    io.on("connection", socket => {
      console.log("🟢 Cliente conectado:", socket.id);
    });
  },

  notify(user_id, data) {
    if (io) io.emit("notif_" + user_id, data);
  }
};
