const router = require('express').Router();
const {
  addCard, getCards, deleteCard, putLike, removeLike,
} = require('../controllers/cards');

router.post('/cards', addCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
