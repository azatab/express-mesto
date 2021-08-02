const router = require('express').Router();
const {
  getUsers, getUser, updateUserProfile, getCurrentUser,
} = require('../controllers/users');

// router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserProfile);

module.exports = router;
