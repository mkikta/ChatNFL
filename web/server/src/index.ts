import 'module-alias/register';
import express, { ErrorRequestHandler } from 'express';
import api from './api';
import bodyParser from 'body-parser';
import { ValidationError } from 'express-validation';

const app = express();
const PORT = process.env.PORT || 3001;
console.log('Hello World')

app.use(bodyParser.json());

app.use('/api', api);

app.get('/', (req, res) => {
  // TODO: Eventually this will serve the static web page once we create a prod build
  // For development, simply run both the backend and frontend individually
});

const errorHandler : ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err);
  } else {
    console.log(err);
    console.log(err.details);
    res.sendStatus(500);
  }
}
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});