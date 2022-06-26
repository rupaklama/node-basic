/* Server related */

// to access Env variables
const dotenv = require('dotenv');

// note - by default, env variable is set to development in express
// console.log(app.get('env')); // development

// object to specify the path to our config file
// this will set env variables in Node process module
dotenv.config({ path: './config.env' });

// env variables set by Node which comes from Process Core Modules
// console.log(process.env);

const app = require('./app');

const port = process.env.PORT || 4000;

app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
