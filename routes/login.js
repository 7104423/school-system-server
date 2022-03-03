const router = require('express').Router();
const passport = require('passport');

/* GET home page. */
router.post('/', passport.authenticate('local'));

module.exports = router;
