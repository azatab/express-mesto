const User = require('../models/user');

const addUser = (req, res) => {
  const data = { ...req.body };
  return User.create(data)
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные'}));
};

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  return User.findOne({ id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .then((user) => {
      if (user) {
        res.status(200).send(user)
      }
      res.status(404).send({ message: 'Запрашиваемый пользователь не найден' })
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports = { addUser, getUsers, getUser, updateUserProfile };
