const fs = require('fs');
const express = require('express');

/* express app instance */
const app = express();

// Middleware to consume Request Body Object
app.use(express.json());

/* routes */
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

/* File Reading should be done outside of Route handler */
// __dirname - current root folder
const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/* Get */
/* Keeping Api endpoints exactly the SAME as a good practice with related Route handler */
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    // sending additional data for client side
    results: toursData.length,
    data: {
      // matching endpoint
      tours: toursData,
    },
  });
});

/* Detail */
// :id? is to make it optional
app.get('/api/v1/tours/:id', (req, res) => {
  // to access req.params object with param query variables
  // console.log(req.params);

  const id = Number(req.params.id);
  const tour = toursData.find((i) => i.id === id);

  // if (id > toursData.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

/* Post */
app.post('/api/v1/tours', (req, res) => {
  // Express does not put Body data/object in the request by default
  // We have to use Middleware to have Request Body Object available
  // console.log(req.body); NOTE - the Request Body gets parsed into an Object

  // note - accessing object's id property & adding 1 to create a new id
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = { id: newId, ...req.body }; // or Object.assign({id: newId}, req.body)

  toursData.push(newTour);

  // NOTE - now this Route handler runs inside of the event loop & we should not block the event loop
  // therefore, we are going to use the Async write func and not the Synchronous one
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,

    // note - parsing toursData object into JSON Strings since our local data is json
    JSON.stringify(toursData),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  // Note - we always need to send back something to finish Request/Response Cycle
  // res.send('Done');
});

/* Patch */
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > toursData.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

/* Delete */
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > toursData.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    // data no longer exists
    data: null,
  });
});

const port = 4000;

app.listen(port, '127.0.0.1', () => {
  console.log(`App running on port ${port}`);
});
