const router = require('express').Router();

const { logOut } = require('../utils/utils');

/* GET users listing. */
router.get('/', logOut);

module.exports = router;
