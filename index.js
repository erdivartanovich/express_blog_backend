const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//import model
const Posts = require('./src/domains/posts');


//app config
const port = 8080;

// config middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//       "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.header(
//       "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//generate data
const posts = new Posts();

// routing
app.get('/', function(req, res) {
  res.send('<h1>Hello World</h1>');
})

app.get('/posts', function (req, res) {
  res.json(posts.posts);
})
app.get('/posts/:id', function (req, res) {
  const post = posts.show(req.params['id']);
  res.json(post);
});
app.put('/posts/:id', function (req, res) {
  const payloads = req.body;
  const post = posts.update(req.params['id'], payloads);
  res.json(post);
});



// app.listen(port, function () {
//   console.log(`Server listening on port ${port}!`);
// });

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || port, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}