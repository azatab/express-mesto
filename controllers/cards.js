const Card = require('../models/card');

const addCard = (req, res) => {
  const data = { ...req.body, owner: req.user._id };

  return Card.create(data)
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(400).send(err));
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(400).send(err));
};

const deleteCard = (req, res) => {
  const id = req.params.cardId;
  return Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => res.status(400).send(err));
};

const putLike = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => res.status(200).send(card))
  .catch((err) => res.status(400).send(err))
};

const removeLike = (req, res) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => res.status(200).send(card))
  .catch((err) => res.status(400).send(err))
};

module.exports = { addCard, getCards, deleteCard, putLike, removeLike };
