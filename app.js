var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//library
var flash   = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var member_teamRouter = require('./routes/member_team'); // <-- route schedule
var scheduleRouter = require('./routes/schedule'); // <-- route schedule
var teamRouter = require('./routes/team'); // <-- route schedule
var postsRouter = require('./routes/posts');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

app.use(session({ 
  cookie: { 
    maxAge: 60000 
  },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use(flash())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member_team', member_teamRouter); // use route posts di Express
app.use('/schedule', scheduleRouter); // use route posts di Express
app.use('/team', teamRouter); // use route posts di Express
app.use('/api', apiRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;