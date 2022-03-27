// fs object with CommonJS module syntax
const fs = require("fs");
const http = require("http");

/* Server */
// to create http server instance
const server = http.createServer((req, res) => {
  // console.log(req);
  res.end("Hello from the Server!");
});

// port to start a server - localhost
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

/* Files */
// Blocking - synchronous way of reading file
// two args - path & character encoding - utf-8 for english usually
// const textInputFile = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInputFile);

// write file
// const textOutputFile = `This is what we know about the avocado: ${textInputFile}. \nCreated on ${new Date().toISOString()}`;
// fs.writeFileSync("./txt/output.txt", textOutputFile);
// console.log("File written!");

// Non-blocking - asynchronous way of reading file
// callback to implement async way - takes two params
// fs.readFile("./txt/startt.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("ERROR", err);
//     return;
//   }
//   console.log(data);
// });
