const express = require('express');
const db = require('../connection');
const PostService = require('./domains/posts/post-service');
const JSONRequestValidator = require('./http/json-request-validator');
const { presentError, presentResponse } =  require('./http/json-presenter');

// for connection test purpose
db('users').then(function(result){
  console.log("***", 'successfully connect to database', '***');
});

const app = express();
app.enable('trust proxy');

const bodyParser = require('body-parser');

//app config
const port = 8080;
const prefix = '/api/v1';

// config middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
      "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// load public folder as static
app.use(express.static('public'));

// request validate
app.use(JSONRequestValidator);

//generate data
const posts = new PostService();

// routing
app.get(prefix + '/', function(req, res) {
  res.send('<h1>Hello World</h1>');
})

app.get(prefix + '/posts', function(req, res) {
  posts.get()
    .then(function(results){
      presentResponse(res, 'posts', results, 'success');
    })
    .catch(function(error) {
      presentError(res, error, 'error when get');
    })
});

app.post(prefix + '/posts', function(req, res) {
  if (!req.valid) {
    const msg = req.notValidTypes;
    return presentError(res, [], msg);
  }
  const payloads = req.body;
  posts
    .create(payloads)
    .then(function(result){
      presentResponse(res, 'posts', result, 'success')
    })
    .catch(function(error){
      presentError(res, error, 'error on create')
    });
});

app.get(prefix + '/posts/:id', function(req, res) {
  posts.show(req.params['id'])
    .then(function(post){
      presentResponse(res, 'posts', post, 'success');
    })
    .catch(function(error){
      presentError(res, error, 'error on get');
    });
});
app.patch(prefix + '/posts/:id', function(req, res) {
  if (!req.valid) {
    const msg = req.notValidTypes;
    return presentError(res, [], msg);
  }
  const payloads = req.body;
  posts
    .update(req.params['id'], payloads)
    .then(function(post){
      presentResponse(res, 'posts', post, 'success')
    })
    .catch(function(error){
      console.log("***", error);
      presentError(res, error, 'error on update');
    });
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || port, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}