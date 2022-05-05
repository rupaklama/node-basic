// Streams is to process (read & write) data piece by piece or chunks, without completing the whole
// read or write operation, therefore, without keeping all data in memory.
// Don't have to wait until all data is available, serve as you go process.
// Perfect for handling large volumes of data. Example - video downloading & streaming

// note - Streams are instances of the EventEmitter Class

const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // solution 1 - saving in variable 'data' in memory first to serve entire file, not a good choice
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);

  //   res.end(data);
  // });

  // solution 2  - Using Streams to server on the go without downloading & saving entire file in memory first
  // Great choice for large data in general.
  // creating stream to serve chunk by chunk which emits a data event
  const readable = fs.createReadStream("test-file.txt");

  // pipe method is to balance the data flow in/out to avoid slower rendering issues
  // knowns as Back Pressure in node.
  // Consuming from readable source & writing into writable source.
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening @ 8000");
});
