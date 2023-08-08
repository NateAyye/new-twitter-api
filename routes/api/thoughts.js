const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.route('/').get(async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}).post(async (req, res) => {
  const { username, userId, thoughtText } = req.body;
  try {
    const thought = await Thought.create({ thoughtText, username });
    try {
      const user = await User.findByIdAndUpdate(userId, { $push: { thoughts: thought.id } }, { new: true });
      if (!user) {
        await Thought.findByIdAndDelete(thought.id);
        return res.status(404).json({ message: 'No user with this id!' });
      }
    } catch (error) {
      await Thought.findByIdAndDelete(thought.id);
      return res.status(500).json(error);
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const thought = await Thought.findById(id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}).put(async (req, res) => {
  const { id } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      id,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}).delete(async (req, res) => {
  const { id } = req.params;
  try {
    const thought = await Thought.findByIdAndDelete(id)
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json({ message: 'Thought deleted!', thought });
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;