const User = require('../models/user');

const addUser = (req, res) => {
  const data = { ...req.body };
  return User.create(data)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err));
};

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
};

const getUser = (req, res) => {
  const { id } = req.params;
  return User.findOne({ id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(400).send(err));
};

const updateUserProfile = (req, res) => {
  const data = { ...req.body };
  return User.findByIdAndUpdate(
    req.user._id,
    data,
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send(err));
};

module.exports = { addUser, getUsers, getUser, updateUserProfile };
