const router = require('express').Router();
import {
  addFriend,
  createUser,
  deleteFriend,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../../controllers/usersController';

router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
