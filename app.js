
var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000, function () {
  console.log('server started...');
});
