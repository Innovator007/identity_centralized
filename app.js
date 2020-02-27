const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv')
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
// const AppError = require('./utils/appError');
// const globalErrorHandler = require('./controllers/errorController');
// const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
dotenv.config({ path: './config.env' });

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser : true,
  useCreateIndex : true,
  useFindAndModify : false,
  useUnifiedTopology : true
}).then(() => {
  //console.log(con.connections);
  console.log('DB connection successful');
});

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));
// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));
// Serving static files
app.use(express.static('./public/assets'));

// 3) ROUTES

app.use('/', userRouter);

module.exports = app;
