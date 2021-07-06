const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '60e3443ec4111347c4ca13d2',
  };

  next();
});

app.use('/', express.json());
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
