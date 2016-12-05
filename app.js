"use strict;"

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./node_modules/mongoose');

var index = require('./routes/index');
var simpleSearch = require('./routes/simple search');
var files = require('./routes/files');
var result = require('./routes/result');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//connecting to mongodb with mongoose ('mongodb://localhost/[name of the DB]')
//mongoose.connect('mongodb://localhost/Mtest');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'client/images/mamram.ico')));

app.use(logger('dev'));
// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client')));

app.use('/', index);
app.use('/simpleSearch', simpleSearch);
app.use('/api', files);
app.use('/res', result);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/*',function (req,res,next){
  console.log(req);
}
);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
