const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

// note - changing default Thread Pool Size of 4 to our needs on LIBUV package
// This will take much longer time since there is only 1 thread to execute code one after another
// process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);

  // When you want to execute some piece of code asynchronously,
  // but as soon as possible, one option is to use the setImmediate() function provided by Node.js
  // Any function passed as the setImmediate() argument is a callback
  // that's executed in the next iteration of the event loop.
  // Used to execute a function right after the current event loop finishes
  setImmediate(() => console.log("Immediate 2 finished"));

  // A function passed to process.nextTick() is going to be executed on the current iteration of the event loop, after the current operation ends. This means it will always execute before setTimeout and setImmediate.
  process.nextTick(() => console.log("Process.nextTick"));

  // Expensive calculation gets offloaded into Thread Pool to handle it by Event Loop
  // By default 4 Thread Pools provided which occurs at the same time
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

// note - top level code gets executed first
console.log("Hello from the top-level code");

// NOTE - A setTimeout() callback with a 0ms delay is very similar to setImmediate(). The execution order will depend on various factors, but they will be both run in the next iteration of the event loop.
