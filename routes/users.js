const router = require('express').Router();
const { addUser, getUsers, getUser, updateUserProfile } = require('../controllers/users');

router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserProfile);

module.exports = router;
