import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';
import { fileURLToPath } from 'url';
import logger from './logger.js';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import dbRouter from './routes/db.js';
import formRouter from './routes/form.js';
import helloRouter from './routes/hello.js';
import indexRouter from './routes/index.js';
import tableRouter from './routes/table.js';
import usersRouter from './routes/users.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const sessionOptions = {
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 24 },
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/db', dbRouter);
app.use('/form', formRouter);
app.use('/hello', helloRouter);
app.use('/table', tableRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  logger.error({ error: err }, err.message);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
