// fs object with CommonJS module syntax
const fs = require("fs");

// synchronous way of reading file
// two args - path & character encoding - utf-8 for english usually
const textInputFile = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInputFile);
