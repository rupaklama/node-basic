/* node core modules */
/* npm modules - third party */

/* developer created modules */
const C = require("./test-module1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// multiple exports
// const calc2 = require("./test-module2");
const { add, multiply, divide } = require("./test-module2");
console.log(multiply(2, 5));

/* Stage 2 after loading module - wrapping with default arguments */
// arguments is an array of values in js
// console.log(require("module").wrapper);
// console.log(arguments);
