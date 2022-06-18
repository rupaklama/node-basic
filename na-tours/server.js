/* Server related */

const app = require('./app');

const port = 4000;

app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
