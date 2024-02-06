const express = require('express');
const { createUser } = require('../controllers/user');

const router = express.Router()

router.post('/user-create', createUser);

module.exports = router;
