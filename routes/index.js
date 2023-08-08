const router = require('express').Router();

router.use('/api', require('./api'));

router.use('/', (req, res) => {
  return res.send('Wrong route!')
});

module.exports = router;