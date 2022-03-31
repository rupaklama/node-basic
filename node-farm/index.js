"use strict";

// importing objects with CommonJS module syntax

// file system
const fs = require("fs");

// http server instance
const http = require("http");

// routings
const url = require("url");
// console.log("URL", url);

// NOTE - This Top Level code, code outside of function only gets executed
// once right in the beginning where as the http function below gets call always whenever there is a request.

// '.' is root directory where the script is running
// __dirname is the directory where the current file is located

// note - Synchronous execution because this code will get executed once and also to not to read file whenever
// there is a request therefore saving it in a variable.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// variables holds Strings from html
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

/* helper function to render html */
const replaceTemplate = (temp, product) => {
  // created variable as it is not a good practice to manipulate Arg directly
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);

  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  // final html
  return output;
};

// parsing json data to js object
// array of products
const dataObj = JSON.parse(data);

/* Server */
// to create http server instance
const server = http.createServer((req, res) => {
  // request url - /product?id=0
  // console.log(req.url);

  // url.parse() method takes a URL string, parses it, and returns a URL object with properties
  // console.log(url.parse(req.url, true));
  // destructuring object properties that we need
  const { query, pathname } = url.parse(req.url, true);

  /* overview page */
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    // products array
    const cardsHtml = dataObj.map(prod => replaceTemplate(templateCard, prod)).join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    /* product page */
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);

    res.end(output);

    /* api page */
  } else if (pathname === "/api") {
    // '.' is root directory where the script is running
    // __dirname is the directory where the current file is located

    // Sends a response header to the request with our json data
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    /* not found page */
  } else {
    // console an error and also use to send header
    // Second param is the http Header Object - response object
    res.writeHead(404, {
      // standard header to inform the browser the Content type
      // now the browser is expecting some html
      "Content-type": "text/html", // sending html content type

      // custom header
      "my-own-header": "hello-world",
    });

    // note - this needs to come/after after we setup http code & header above
    res.end("<h1>Not found</h1>");
  }
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
