const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');
import {
  createReaction,
  createThought,
  deleteReaction,
  deleteThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
} from '../../controllers/thoughtsController';

router.route('/').get(getAllThoughts).post(createThought);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
