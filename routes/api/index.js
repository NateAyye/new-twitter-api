const router = require('express').Router();

router.use('/users', require('./user'));

router.use('/thoughts', require('./thoughts'));

module.exports = router;