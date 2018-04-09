var express = require('express');
var app = express();
var path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app
// ROUTES
  .get('/joke/:id', function (req, res) {
    console.log('getting joke');
    var joke = {};
    res.status(200);
    res.send(joke);
  })
  .post('/joke/:joke', function (req, res) {
    console.log('posting joke');
    var joke = {};
    res.status(200);
    res.send(joke);
  })
  .put('/joke/:id', function (req, res) {
    console.log('updating joke');
    var joke = {};
    res.status(200);
    res.send(joke);
  })
  .delete('/joke/:id', function (req, res) {
    console.log('deleting joke');
    var joke = {};
    res.status(200);
    res.send(joke);
  });

app.listen(3000);