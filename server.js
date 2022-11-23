console.log("script loaded");

let express = require("express");

//we are activating express
let app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port);

app.use(express.static("public"));

console.log("running server on http://localhost:" + port);

let serverSocket = require("socket.io");

let io = serverSocket(server);
//i connecting my web service to my socket variable

io.on("connection", newConnection);

function newConnection(newSocket) {
  console.log(newSocket.id);

  newSocket.on("mouse", mouseReceived);

  function mouseReceived(dataReceived) {
    console.log(dataReceived);
    newSocket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
