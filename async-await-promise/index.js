const fs = require("fs");
const { resolve } = require("path");

// http request module to make AJAX requests
const superagent = require("superagent");

// __dirname means current dir
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

// Callback Hell - deeply nested callback inside of callbacks
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err, res) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file!");
//       });
//     });
// });

/* Promise solves the Callback Hell issues */
// Creating Functions that returns promises
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Error");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.watchFile(file, data, (err) => {
      if (err) reject("error");
      resolve("success");
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`).then((data) => {
//   console.log(`Breed: ${data}`);

//   // Callback Hell - deeply nested callback inside of callbacks
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       return writeFilePro("dog-img.txt", res.body.message);
//     })
//     .then(() => console.log("File written"))
//     .catch((err) => console.log(err.message))
//     .finally(() => console.log("fetch completed"));
// });

/* Async/Await to consume promises - cleaner syntax */
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dog-img.txt", res.body.message);
    console.log("File written");
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("All done");
  }
};

console.log("1: Will get dog pics!");
getDogPic();
console.log("2: Done getting dog pics!");
