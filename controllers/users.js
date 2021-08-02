const bcrypt = require('bcryptjs');
const User = require('../models/user');

const addUser = (req, res) => {
  const data = { ...req.body };
  console.log(data);
  bcrypt.hash(data.password, 10)
    .then((hash) => User.create({
      email: data.email,
      password: hash,
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      res.status(500).send({ message: err.message });
    });
};

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send({ message: err.message }));

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
      console.log(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      } if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};
const updateUserProfile = (req, res) => {
  const data = { ...req.body };
  return User.findByIdAndUpdate(
    req.user._id,
    data,
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      } if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  addUser, getUsers, getUser, updateUserProfile,
};
