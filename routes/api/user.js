const Thought = require('../../models/Thought');
const User = require('../../models/User');
const router = require('express').Router();

router.route('/').get(async (req, res) => {
  try {
    const users = await User.find({}).populate('friends').populate('thoughts');
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
}).post(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}).put(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}).delete(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    await Thought.deleteMany({ username: user.username });

    res.json({ message: 'User deleted!', user });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.route('/:userId/friends/:friendId').post(async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const friend = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { runValidators: true, new: true });
    if (!friend) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json({ message: 'Friend Added', friend });
  } catch (err) {
    res.status(500).json(err);
  }
}).delete(async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const friend = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { runValidators: true, new: true });
    if (!friend) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json({ message: 'Friend Removed', friend });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;