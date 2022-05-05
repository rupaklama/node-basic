// using built in node events
const EventEmitter = require("events");

const http = require("http");

const myEmitter = new EventEmitter();

// Observers - event listeners
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Rupak");
});

// event emitter - generates event
myEmitter.emit("newSale");

// server event listeners
// on - is to listen to an event
const server = http.createServer();

// we can listen multiple times for the same event
server.on("request", (req, res) => {
  console.log("Request received");

  // getting access into url request
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request");
});

// close event
server.on("close", () => {
  console.log("Server closed");
});

// creating server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening at localhost 8000!");
});
