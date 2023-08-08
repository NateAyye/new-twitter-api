const router = require('express').Router();
const {
  addFriend,
  createUser,
  deleteFriend,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} = require('../../controllers/usersController');

router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
