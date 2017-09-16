
var express = require('express');
var path = require('path');
var handlebars = require('express-handlebars');

var app = express();

// hanldebars middleware
app.engine('handlebars', handlebars({
  'defaultLayout': 'main'
}));
app.set('view engine', 'handlebars');

// static serving middleware
var staticOptions = {
  'index': false
}
app.use(express.static(path.join(__dirname, 'public'), staticOptions));

// pick the port
app.set('port', (process.env.PORT || 8000));

// oh fuck we can use routing now
app.get('/', function (req, res) {
  res.render('pretty-chart');
});

app.post('/register', function (req, res) {
  console.log('post request recieved...');
  res.render('dashboard');
})

app.listen(app.get('port'), function () {
  console.log('server started on port ' + app.get('port') + '...');
});
