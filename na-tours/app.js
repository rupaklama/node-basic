const express = require('express');

/* express app instance */
const app = express();

/* routes */
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

const port = 4000;

app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
