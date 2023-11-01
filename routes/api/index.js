const router = require('express').Router();
const user = require('./userRoute');
const thought = require('./thoughtRoute');

router.use('/users', user);
router.use('/thoughts', thought);

module.exports = router;