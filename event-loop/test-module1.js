// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiple(a, b) {
//     return a * b;
//   }

//   divide(a, b) {
//     return a / b;
//   }
// }

// we use this when we want to export on single value/variable
module.exports = class {
  add(a, b) {
    return a + b;
  }

  multiple(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;
  }
};
