// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const localsMiddleware = require('./middlewares/localsMiddleware');
const userCookieMiddleware = require('./middlewares/userCookieMiddleware');
const method = require('method-override');

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'lo que sea',
  resave: true,
  saveUninitialized: true
}));
app.use(userCookieMiddleware);
app.use(localsMiddleware);
app.use(method('_m'));


// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Seteo de la ubicación de la carpeta "views"



// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/usersRoutes');
const productsRouter = require('./routes/productsRoutes');
// API
const apiProductsRouter = require('./routes/api/products');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/products', apiProductsRouter);


// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
