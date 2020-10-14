const zmq = require("zeromq");

let sock = null;

module.exports = {
  connectSock: function () {
    sock = new zmq.Request();
    sock.connect("tcp://127.0.0.1:5555");
  },
  getSock: function () {
    if (!sock) {
      sock = new zmq.Request();
      sock.connect("tcp://127.0.0.1:5555");
    }

    if (sock.closed) {
      sock.connect("tcp://127.0.0.1:5555");
    }
    return sock;
  },
};
